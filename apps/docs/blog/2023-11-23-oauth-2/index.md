---
slug: simply-oauth-2-0
title: Simply OAuth 2.0
authors: stuyu
tags: [nodejs, oauth2, authorization, serverless, AWSLambda]
---

When our applications start growing over time, we require more and more levels and layers of authentication whether for security in our services or to access third-party APIs, and with this we have to involve a different subset of technologies to match our current business demands.

![Photo by Georg Bommeli on Unsplash](https://miro.medium.com/v2/resize:fit:720/format:webp/0*7NkquZaGvTytv1AQ)

## Introduction
OAuth (Open Authorization) is a protocol for delegating permissions on applications or across the internet. Basically, OAuth allows us to issue an access token so other applications can access it in a controlled way to interact with our services.

Most of the top companies use OAuth to interact with their services, like signing up with Facebook or Gmail into a different application a simple flow for this may look like this:

<div style={{textAlign: 'center'}}>
![Simple user profile information OAuth 2.0](https://miro.medium.com/v2/resize:fit:640/format:webp/1*P6h0JPX4F-Emh4TUzFGMyg.png)
</div>

> Note: In this flow and for flows that only require sign-up for third-party apps we should only store (if needed) some reference for the user, access tokens should be treated as passwords, therefore the less we know the better.

There are two different sides to this, the first one is the common one where we are in charge of requesting access tokens, and the second one where we are the ones who emit the access tokens, for the first scenario there is quite a lot of documentation out there but what if we want to emit an access token?

![A draft explaining how an architecture for breaking OAuth Service into serverless may look like](https://miro.medium.com/v2/resize:fit:720/format:webp/1*8HJMGYPEuQEAJs2HTCKHKg.png)

For emitting access tokens would be good to consider:

1. Adding a scope: The whole idea behind OAuth 2.0 is allowing controlled access, so you can provide or revoke access from only certain information at any point in time.

2. Adding an expiration date: Even with the fact that we may revoke the permission of an access token at any point in time, would be good to add a default expiration date (there is a lot of documentation mentioning expiration times from 5 minutes to 7 days, really is up to business needs).

3. Secure who can request a token: Depending on the business needs you’ll have to decide who can request an access token since not everybody should be allowed to.


Using NodeJs would be quite simple to create a lambda that can perform authorization in quite a few steps, and can be achieved using `oauth2orize` and passport. Where it would be good to consider:

1. Perform a cost analysis: while for most businesses serverless is a fit, you may come across that this architecture may not be a fit for you.

2. Database considerations: While storing user information connection and read/write times are quite important, most in a lambda when by default we have a latency during cold starts, I’ll suggest using DynamoDb for ultra-fast access into a DB.

```node
// Simple implementation using ouath2orize, passportjs

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return done(null, false);
  }

  const tokenValue = crypto.randomBytes(32).toString('hex');
  const token = { value: tokenValue, clientId: client.id, userId: user.id };
  tokens.push(token);

  return done(null, tokenValue);
}));

server.exchange(oauth2orize.exchange.clientCredentials((client, scope, done) => {
  const tokenValue = crypto.randomBytes(32).toString('hex');
  const token = { value: tokenValue, clientId: client.id };
  tokens.push(token);

  return done(null, tokenValue);
}));
```