---
title: "Oracle Cloud Object Storage"
description: "Oracle Cloud Object Storage is AWS S3 compatible, but requires a little bit different configuration. And 10GB are Always Free!"
draft: false
images: []
weight: 070
toc: false
type: subpages
---

AWS S3 compatible Oracle Cloud Object Storage (https://www.oracle.com/cloud/storage/object-storage/) is a great choice when you don't want to invest cash, because it contains 10GB of storage in Always Free Tier (https://www.oracle.com/cloud/free/#always-free).

## Create a Bucket

1. Go to https://cloud.oracle.com/object-storage/buckets
2. Click "Create Bucket"
3. Give name
4. Leave the other options default
5. After creating click on bucket name
6. Click "Edit visibility"
7. Choose "Public"
8. Click "Save changes"
9. Copy & save "Namespace" (see: picture below)

{{< img src="/docs/img/oracle-namespace.png" align="center">}}

## Create an expiration policy

You should expire old segments on your Bucket. [Here are some additional details.](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usinglifecyclepolicies.htm)

- Once an object expires you won't be charged for storage, even if the object isn't deleted immediately.
- A one day object expiration lifecycle rule on objects is as low as you can go, so use that.

Click into your bucket and scroll down.

Create a new lifecycle policy rule:

1. Click "Lifecycle Policy Rules"
2. Click "Create Rule"
3. Give some name
4. Set "Lifecycle Action" to "Delete"
5. Set "Number of Days" to 1
6. Click "Create"

It could fail, because of lack of Policy Statements.

If failed, do this:

1. Go to https://cloud.oracle.com/identity/policies
2. Click "PSM-root-policy" (or other, if you created specific IAM user)
3. Click "Edit Policy Statements"
4. 3 x click "+ Another Statement" (bottom right)
5. Add (default `<GROUP_NAME>` is "Administrators"):
   - `Allow group <GROUP_NAME> to manage buckets in tenancy`
   - `Allow group <GROUP_NAME> to manage objects in tenancy`
   - `Allow service objectstorage-<REGION> to manage object-family in tenancy`
6. Click "Save Changes"

## Collect auth data

1. Click you profile picture (top right corner)
2. Click "User Settings"
3. Scroll down
4. Click "Customer Secret Keys"
5. Click "Generate Secret Key"
6. Give some name
7. Copy & save Secret Key generated in popup (it will show only once!)
8. Click "Close"
9. Copy & save "Access Key"

## Configure Owncast

Navigate to the "Storage" tab.

- Endpoint: `https://<NAMESPACE>.compat.objectstorage.<REGION>.oraclecloud.com`
- Access Key: The key you created earlier
- Secret Key: The secret key you created earlier
- Bucket: The short name of your Bucket you created
- Region: `<REGION>` (i.e "eu-frankfurt-1")

Optional Settings (but in this case required):

- Serving Endpoint: `https://objectstorage.<REGION>.oraclecloud.com/n/<NAMESPACE>/b/<BUCKET_NAME>/o` (!!! MUST NOT end with slash !!!)
- Force path-style: ON
