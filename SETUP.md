Shopify App Setup
===

Follow these steps to install and configure the Shopify app using either an Access Token or OAuth credentials.

## Using Access Token

Head over to your Shopify store and login to the store admin. 

From the store admin dashboard, navigate to the "Settings" page using the button in the bottom left.

From here, click "Apps and sales channels" in the navigation panel on the left.



[![](/docs/assets/setup/shopify-setup-13.png)](/docs/assets/setup/shopify-setup-13.png)

Next, click on the "Develop apps" link at the top of the page.

[![](/docs/assets/setup/shopify-setup-02.png)](/docs/assets/setup/shopify-setup-02.png)

Click on the "Allow custom app development" button.

[![](/docs/assets/setup/shopify-setup-03.png)](/docs/assets/setup/shopify-setup-03.png)

Confirm this by clicking "Allow custom app development".

[![](/docs/assets/setup/shopify-setup-04.png)](/docs/assets/setup/shopify-setup-04.png)

Next, click the "Create an app" button.

[![](/docs/assets/setup/shopify-setup-05.png)](/docs/assets/setup/shopify-setup-05.png)

Give the app a name, by entering "Deskpro Shopify App".

[![](/docs/assets/setup/shopify-setup-06.png)](/docs/assets/setup/shopify-setup-06.png)

Navigate to the "API Credentials" tab of the new app.

[![](/docs/assets/setup/shopify-setup-07.png)](/docs/assets/setup/shopify-setup-07.png)

Click "Configure Admin API scopes"

[![](/docs/assets/setup/shopify-setup-08.png)](/docs/assets/setup/shopify-setup-08.png)

On the scopes screen, **check/select** the following:

* write_assigned_fulfillment_orders
* write_customers
* write_draft_orders
* read_inventory
* write_order_edits
* write_orders
* write_product_listings
* write_products

Then, click "Save" at the bottom of the screen.

Now that we have the app permissions set up, it's time to install the app on Shopify's side. Click the "Install" 
button at the top of the page.

[![](/docs/assets/setup/shopify-setup-10.png)](/docs/assets/setup/shopify-setup-10.png)

Confirm this by clicking "Install" again.

[![](/docs/assets/setup/shopify-setup-11.png)](/docs/assets/setup/shopify-setup-11.png)

You should now see that your admin API access token has been generated. Click "Reveal token once" and copy the API token 
for a later step. It's **important that you keep your secret API token safe**.

[![](/docs/assets/setup/shopify-setup-12.png)](/docs/assets/setup/shopify-setup-12.png)

Ok, head back to Deskpro and navigate to the "Settings" tab.

[![](/docs/assets/setup/shopify-setup-09.png)](/docs/assets/setup/shopify-setup-09.png)

Enter the following details:

* **Shop Name** - this can be found in your shop URL. E.g. for `https://myshop.myshopify.com/` your shop name is `myshop`
* **Access Token** - This is your API access token that you generated in the previous steps

To configure who can see and use the Shopify app, head to the "Permissions" tab and select those users and/or groups 
you'd like to have access.

When you're happy, click "Install".

## Using OAuth

Go to your Shopify Partner account and navigate to the Apps section in the sidebar. On the "Apps" page, click "Create app".

[![](/docs/assets/setup/shopify-setup-oauth-01.png)](/docs/assets/setup/shopify-setup-oauth-01.png)

On the "Create a new app" page click "Create app manually" under "Use Shopify Partners", give your app a name (e.g. Deskpro) and click "Create".

[![](/docs/assets/setup/shopify-setup-oauth-02.png)](/docs/assets/setup/shopify-setup-oauth-02.png)

Once the app is created, you'll see a screen with its details. Copy the `Client ID` and `Client Secret`, then enter them in the Settings tab in Deskpro.

[![](/docs/assets/setup/shopify-setup-oauth-05.png)](/docs/assets/setup/shopify-setup-oauth-05.png)

Next, click "Choose distribution" on the same page to make your app live.

Select a distribution method. Public apps require approval from Shopify, while Custom apps are intended for use on a single store without requiring approval. This guide follows the Custom app setup.

[![](/docs/assets/setup/shopify-setup-oauth-03.png)](/docs/assets/setup/shopify-setup-oauth-03.png)

Enter your store url and click "Generate Link"


Now, click Configuration in the sidebar. Enter the callback URL from the Settings tab in Deskpro into the "Allowed redirection URL(s)" field. Set "Embed app in Shopify admin" to `false`.

[![](/docs/assets/setup/shopify-setup-oauth-04.png)](/docs/assets/setup/shopify-setup-oauth-04.png)


Once you've made these changes, click "Save and release".

To configure who can see and use the Shopify app, head to the "Permissions" tab and select those users and/or groups 
you'd like to have access.

When you're happy, click "Install".

