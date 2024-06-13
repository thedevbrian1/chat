import { eventStream } from "remix-utils/sse/server";
import { emitter } from "~/services/emitter";

export async function loader({ request }) {
    return eventStream(request.signal, function setup(send) {
        function handle(message) {
            send({ event: 'new-message', data: message });
        }
        emitter.on("message", handle);

        return function clear() {
            emitter.off("message", handle);
        };
    });
}