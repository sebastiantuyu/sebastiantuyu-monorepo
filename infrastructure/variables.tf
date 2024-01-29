variable "region" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "availability_zones" {
  type = list(string)
}

variable "workstation_ip" {
  type = string
}

variable "amis" {
  type = map(any)
  default = {
    "us-east-1": "ami-06aa3f7caf3a30282"
  }
}

variable "key_name" {
  type = string
}