---
slug: cdn-true-challenge
title: "A Self hosted CDN: The true challenge"
authors: stuyu
tags: [iac, pulumi, oracle]
---

> Depending on your budget, cloud provider and other factors you won’t be required to create your self-hosted CDN. You may ask why, in our case it made sense from technical and budget-wise.
> We’ll be using Oracle Cloud in this adventure.


![A lot of traffic, literally. Photo by Jan-Philipp Thiele on Unsplash](https://miro.medium.com/v2/resize:fit:720/format:webp/0*SX94GcQib2qdmVW7)


## Introduction
A CDN (aka. Content Delivery Network) is basically a geographically distributed network, this will increase availability and performance by speeding up loading times. The idea of a CDN is to have a node close from the user region, that’s why should be distributed and is faster than serving from the origin.
The CDN will work as a layer for content caching.

The other term for this introduction is caching, that is basically storing data usually in-memory for faster access than reading from disk. With this we can have very tiny serving times. (I’ll be showing the results in the next part).

The following diagram explains how a cache layer works in from a high-level perspective.

![Credits: Made by @stuyu](https://assets.sebastiantuyu.com/1_yxLs_SndIRLhK1gc-X4Hlg.webp)

Our CDN will be for this article, stored in México but the idea is to be distributed across multiple regions to follow the definition of CDN. However, the resources provided will allow to scale or deploy across any region.

Implementation
We’ll be exploring how each node for this cache layer works, as is explained in the following diagram, however is important to understand:

1. This configuration can be extrapolated into any amount of regions, since we’ll be handling this configuration with IaC, pulumi is the election of my choice since it integrates the beauty of Typescript and the cloud.
![CDN Architecture: K8s Cluster + OCI Bucket Storage. Made by @stuyu](https://miro.medium.com/v2/resize:fit:720/format:webp/1*0Trz4K2hXxtmulKkvzEeKg.png)

2. Cache invalidation is very important considering a pipeline where many deployments are happening during the day, this can be done since each instance is managed by Kubernetes. A Simple deployment flow can be seen as:

- Cache invalidation can happen as serverless, using OCI Functions to trigger the proper pulumi action, is matter of understanding the most suitable configuration.
![Pipeline for Cache Invalidation. Made by @stuyu](https://miro.medium.com/v2/resize:fit:720/format:webp/1*pj15YHboZIusI2-fpL7Jrg.png)

The pulumi code for this implementation may look like the following, here we create a VCN and create a K8s cluster, as I mentioned before, this code can be implemented through multiple regions.

```
/*****************************
* "@pulumi/pulumi": "^3.0.0" *
* "@pulumi/oci": "^1.7.0"    *
******************************/

import * as oci from "@pulumi/oci";

const compartmentId = "ocid.....";

const vcn = new oci.core.Vcn("EdgeClusterVCN", {
  compartmentId,
  cidrBlock: '10.0.0.0/16'
});

const publicSubnet = new oci.core.Subnet("EdgeClusterPublicSubnet", {
  vcnId: vcn.id,
  cidrBlock: '10.0.2.0/24',
  compartmentId
});

const EdgeClusters = new oci.containerengine.Cluster("EdgeCluster", {
  compartmentId,
  name: 'EdgeCluster',
  kubernetesVersion: 'v1.26.2',
  vcnId: vcn.id,
  type: 'Basic',
  endpointConfig: {
    isPublicIpEnabled: true,
    subnetId: publicSubnet.id,
  },
  options: {
    kubernetesNetworkConfig: {
      podsCidr: '10.0.3.0/16',
    }
  }
  // ...
});
```

Regarding the image for the container, we can use different services, in this case NGINX will be enough, I’ll show the most relevant configurations. Remember to follow security best practices for your NGINX instance.

```
http {
  gzip on;
  // Depending on the needs we can set a expiring date,
  // we'll leave at 10 minutes for now
  proxy_cache_path /data/nginx/cache keys_zone=mycache:10m;

  server {
    // Add also headers for security
    proxy_cache my_cache;

    location / {
      proxy_cache_valid 200 10m;
      add_header X-Cache $upstream_cache_status;
      // Leave the trailing slash at this URL that you can get
      // viewing the advanced options on your bucket
      proxy_pass https://...bucketUrl/o/;
    }
  }
}
```

For last, the bucket should be as Public, further explanations may explore different configurations, for now this is meant for PUBLIC ASSETS ONLY. Do not store any sensitive information.


## Instance configuration
According to Oracle Cloud Infrastructure the capacity of Network Bandwidth depends directly into the capacity of the instance, therefore we’ll be using an:

1. **Ampere (ARM Processor)**: The oracle free-tier offers 3k OCPU and 18k GB hours per month for free.
2. **Sizing**: 2 OCPU + 2 GB. This will reflect in 2GB in Network Bandwidth for our instances, as we can see below:


![Configuration for our K8s Nodes](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Hu40C_xsJ1erc5I-7VLbNg.png)

## Final thoughts
This configuration can be done for serving static files and also static websites like react builds. Everything depend on your budget, this approach can be used while using in the OCI.

Using a different cloud provider like AWS, allows to use managed services like Cloudfront that can reduce drastically the deployment time.