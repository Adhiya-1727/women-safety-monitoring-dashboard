import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class SafetyMonitor {

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0);

        server.createContext("/api/safety", exchange -> {

            String response = """
                    {
                        "heartRate": 78,
                        "motion": "Normal",
                        "voice": "Normal",
                        "status": "SAFE"
                    }
                    """;

            exchange.getResponseHeaders().set(
                    "Content-Type", "application/json");

            exchange.getResponseHeaders().set(
                    "Access-Control-Allow-Origin", "*");

            exchange.getResponseHeaders().set(
                    "Access-Control-Allow-Methods", "GET");

            exchange.sendResponseHeaders(
                    200, response.getBytes().length);

            OutputStream output = exchange.getResponseBody();

            output.write(response.getBytes());

            output.close();
        });

        server.start();

        System.out.println(
                "Women Safety Backend Running...");
        System.out.println(
                "http://localhost:8080/api/safety");
    }
}