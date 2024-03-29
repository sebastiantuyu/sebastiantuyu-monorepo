terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.34.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
	cidr_block = "10.0.0.0/16"

	tags = {
		Automation: "Terraform"
	}
}

resource "aws_subnet" "subnet_public_1" {
	vpc_id 							= aws_vpc.main.id
	cidr_block 					= "10.0.1.0/24"
	availability_zone		= var.availability_zones[0]

	tags = {
		Automation: "Terraform",
		Type: "Public"
	}
}

resource "aws_subnet" "subnet_public_2" {
	vpc_id 							= aws_vpc.main.id
	cidr_block 					= "10.0.2.0/24"
	availability_zone   = var.availability_zones[1]

	tags = {
		Automation: "Terraform",
		Type: "Public"
	}
}

resource "aws_internet_gateway" "main" {
	vpc_id 					= aws_vpc.main.id

	tags = {
		Automation: "Terraform"
	}
}

resource "aws_route_table" "main-rt1" {
	vpc_id 						= aws_vpc.main.id

	route {
		cidr_block = "0.0.0.0/0"
		gateway_id = aws_internet_gateway.main.id
	}

	tags = {
		Automation: "Terraform"
	}
}

resource "aws_route_table_association" "main-rta1" {
	subnet_id = aws_subnet.subnet_public_1.id
	route_table_id = aws_route_table.main-rt1.id
}

resource "aws_route_table_association" "main-rta2" {
	subnet_id = aws_subnet.subnet_public_2.id
	route_table_id = aws_route_table.main-rt1.id
}

resource "aws_security_group" "webserver-sg" {
	name = "WebServer"
	description = "Webserver Network Traffic"
	vpc_id = aws_vpc.main.id

	ingress {
		description = "SSH from anywhere"
		from_port = 22
		to_port = 22
		protocol = "tcp"
		cidr_blocks = ["0.0.0.0/0"]
	}

	ingress {
		description = "80 from everywhere"
		from_port = 80
		to_port = 80
		protocol = "tcp"
		cidr_blocks = ["0.0.0.0/0"]
	}

	egress {
		from_port = 0
		to_port = 0
		protocol = "-1"
		cidr_blocks = ["0.0.0.0/0"]
	}

	tags = {
		Automation: "Terraform"
	}
}

resource "aws_instance" "web" {
	ami = var.amis[var.region]
	instance_type = var.instance_type
	key_name = var.key_name
	subnet_id = aws_subnet.subnet_public_1.id
	security_groups = [aws_security_group.webserver-sg.id]

	associate_public_ip_address = true

	#userdata
	user_data = <<EOF
	#!/bin/bash
	apt-get -y update
	apt-get -y install nginx
	service nginx start
	echo fin v1.00!
EOF

	tags = {
		Automation: "Terraform"
	}
}