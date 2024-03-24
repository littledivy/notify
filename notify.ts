#!/usr/bin/env -S deno run -A

import { $ } from "jsr:@david/dax";

const command = Deno.args;
const cmd = $.raw`${command.join(" ")}`;

Deno.serve({ port: 3000 }, async function (req) {
  const { response, socket } = Deno.upgradeWebSocket(req);
  socket.onopen = async () => {
    console.log("socket opened");
    let body;
    try {
      await cmd;
      body = "Command executed successfully";
    } catch (e) {
      console.error(e);
      body = e.message;
    }
    socket.send(
      JSON.stringify({
        title: "A message from the server",
        body,
      }),
    );
    socket.close();
  };

  socket.onclose = () => {
    Deno.exit();
  };

  socket.onmessage = (e) => {
    console.log("socket message:", e.data);
  };

  return response;
}, { port: 3000 });
