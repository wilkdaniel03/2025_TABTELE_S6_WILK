import websockets
import asyncio


store: set[websockets.ServerConnection] = set()

async def handle_user(ws: websockets.ServerConnection):
    store.add(ws)
    while True:
        try:
            await ws.recv()
        except:
            store.remove(ws)
            break


async def handle_internal(ws: websockets.ServerConnection):
    async for msg in ws:
        try:
            for sock in store:
                await sock.send(msg)
        except:
            break


async def handler(ws: websockets.ServerConnection):
    if ws.request is not None:
        match ws.request.path:
            case "/user": await handle_user(ws)
            case "/internal": await handle_internal(ws)


async def main():
    async with websockets.serve(handler,"0.0.0.0",8080) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
