## Test Example of Using Vue with Hubs and the "html-script" 

This repository contains packaged scripts that set up ethereal/webLayer3D elements for use in Hubs.  The structure was created to make it possible to have fully interactive elements with their own CSS and javascript, that could be authored and tested outside of hubs.

## Authoring

(More details forthcoming)

For now, the key points are that you should copy one of the same directories (e.g., HubsTest1, if you want synchronized data, or HubsTest2, if your component doesn't need synchronized data) into a new directory, named as you wish.  You can add reusable components if you want, in the components directory.  Shared assets should go in the assets directory.

The files are
- App.vue.  The Vue3 SFC file.
- hubs.js initializes things for use with Hubs.  This exports a method to initialize the component.
- index.html.  The file used for local viewing/debugging. Probably doesn't need to change.
- main.ts.  The mainline of the local viewing/debugging app.  Initializes the component and adds to the page. Probably doesn't need to change.
- shared.js (if networked in hubs).  Creates the master datastore for the component and a method to update it's data if there are changes on the network.

You'll want to add your component to the top level hubs.js and index.html.

## Local Debugging

Run `npm run dev` to run a local dev server that will serve up 2D web pages with your components.  You can refine them as you wish here.

## Testing with Hubs

This is more involved.  You will need to checkout the `core-components` repo as well as this repo (vue-apps), and get an account with ngrok.  A paid account will make things easier.

Step 1. Go to the `core-components` directory in a terminal. If you have a paid account, you can use two reserved names with ngrok.  Pick two of your names and go into the `ngrok-paid.yml` file, and change `blair-core` and `blair-vue-apps` to your two chosen reserved names. You can then run `npm run ngrok-paid` to start the ngrok process with your two domains. One will tunnel to each of the local servers created for `core-components` and `vue-apps` below. If you don't have a paid account, you will run `npm run ngrok-free` and write down the random domains ngrok gives you (e.g., `973d3ab87afb.ngrok.io`).  The one that directs to port `6000` is for the `core-components`, the one that directs to `5000` is for `vue-apps`.

Step 2. In `rollup.config.js`, change the reference to `blair-vue-apps.ngrok.io` to the https url for the ngrok server name for `vue-apps` in Step 1.

Step 3. In another terminal window, in this repository (vue-apps), run the command `npm run serve` to start the server on port 5000.  The ngrok from step 1 will use redirect to this.

Step 4. In the `core-components/rollup-config.js`, you will need to change the reference to `https://blair-vue-apps.ngrok.io` to the https url for the ngrok server name used for `vue-apps` in Step 1. 

Step 5. In another terminal window, in the `core-components` directory, run `npm run serve` to start the local server on port 6000.  The ngrok from step 1 will redirect to this.

Step 6. In your room in hubs, point its script URL at `[https url from step3]/build/index.js`. That is, instead of 'blair-core.ngrok.io/build/index.js', you will have '[YourChosenDomain or RandomDomain for core-components].ngrok.io/build/index.js'.

Now, when you enter the room, the core-components script will be loaded, and it will in turn load this repository's components.  If you make a change to the code in either repo, simple rerun the `npm run serve` command, and reload the hubs room.

## Adding Content to Hubs

In Hubs, you will want to use the `core-components/src/entities/html-script-billboard-spoke-no-name.glb` in Spoke to add elements to the Spoke scene for your room.

You should name the glb element in spoke `[anything]_[componentName]` (e.g., "hubs test node 1_hubsTest1". `[anything]` is any naming you want in spoke (e.g., "hubs test node 1") and `[componentName]` is the name of the component exactly as it is exported in the top level hubs.js file.

You should scale the plane you see to the size you want your content to appear.  If the aspect ration doesn't match the aspect ration of your HTML component, it will be scaled so that it is as big as it can be while retaining it's aspect.
