## Test Example of Using Vue with Hubs and the "html-script" 

This repository contains packaged scripts that set up ethereal/webLayer3D elements for use in Hubs.  The structure was created to make it possible to have fully interactive elements with their own CSS and javascript, that could be authored and tested outside of hubs.

## Authoring

(More details forthcoming)

For now, the key points are that you should copy one of the same directories (e.g., HubsTest1, if you want synchronized data, or HubsTest2, if your component doesn't need synchronized data) into a new directory, named as you wish.  You can add reusable components if you want, in the components directory.  Shared assets should go in the assets directory.

The files are
- App.vue.  The Vue3 SFC file.
- hubs.js initializes things for use with Hubs.  This exports a method to initialize the component.
- index.html.  The file used for local viewing/debugging. Probably doesn't need to change.
- main.js.  The mainline of the local viewing/debugging app.  Initializes the component and adds to the page. Probably doesn't need to change.
- shared.js (if networked in hubs).  Creates the master datastore for the component and a method to update it's data if there are changes on the network.

You'll want to add your component to the top level hubs.js and index.html.

## Local Debugging

Run `npm run dev` to run a local dev server that will serve up 2D web pages with your components.  You can refine them as you wish here.

## Testing with Hubs

This is more involved.  You will need to checkout the `core-components` repo as well as this, and get an account with ngrok.  A paid account will make things easier.

Step 1. Run ngrok in a terminal window, pointing at http port 5000.  If you have a paid account, you can use one of your reserved names for this server, using a command such as `ngrok http -subdomain=blairhome 5000` (with your domain instead of `blairhome`).   If you don't have a paid account, you will run without the `-subdomain` option and write down the random domain ngrok gives you (e.g., `973d3ab87afb.ngrok.io`)

Step 2. In a terminal in this repository, run the command `npm run serve` to start the server on port 5000.  The ngrok from step 1 will use this.

Step 3. In the `core-components/start.js`, you will need to change the reference to `profblair` to one of your reserved ngrok hostnames (you will need a paid ngrok account to have reserved hostnames), or write down the random domain ngrok gives you.

Step 4. In the `core-components/rollup-config.js`, you will need to change the reference to `https://blairhome.ngrok.io` to the https url for the ngrok server name in Step 1. 

Step 5. In a terminal in the `core-components` directory, run `npm run start` to start the ngrok server.

Step 6. In your room in hubs, point it's script URL at `[https url from step3]/src/rooms/index.html`

Now, when you enter the room, the core-components script will be loaded, and it will in turn load this repository's components.  If you make a change to the code in this repo, simple rerun the `npm run serve` command, and reload the hubs room.

## Adding Content to Hubs

In Hubs, you will want to use the `core-components/src/entities/html-script-billboard-spoke-no-name.glb` in Spoke to add elements to the Spoke scene for your room.

You should name the glb element in spoke `[anything]_[componentName]` (e.g., "hubs test node 1_hubsTest1". `[anything]` is any naming you want in spoke (e.g., "hubs test node 1") and `[componentName]` is the name of the component exactly as it is exported in the top level hubs.js file.

You should scale the plane you see to the size you want your content to appear.  If the aspect ration doesn't match the aspect ration of your HTML component, it will be scaled so that it is as big as it can be while retaining it's aspect.
