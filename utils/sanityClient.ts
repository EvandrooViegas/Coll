import { createClient } from "next-sanity";

export const client = createClient({
    // token: "skrn6EtCm7Z2FIL68mIkcyZWAN3odUNT72p0CgfRrbMqM1IZeypmGZM1QcxSl3fH6zCsh2b4YVhDnV13QDukbaBgW0tkbLEbOJErR6HNTEZwfCCjBLrjvN6Yr4Vbl6NxAlRsXWLXXaweU70Aa38gTzfCyuO7ThiPZx7M2S5cmx6TWSKBdLM4",
    token: "skpBTJJEq5zXeCDR8IDcDjFPdDHgWX8ttpd3p461tysFtEvPISC9cv2RcGEmkpAk0eqxY8vrBbANP8am4rhXqQtvByozaf1vjHmB9VxLKbJR33R0BciiznElMMvDH9fi66kDAc6pRcUaNRAFUls298CmJma8bOYxqso1hKoNg97Bpidt7mQ1",
    projectId: "igfi5h2t",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
});



console.log()