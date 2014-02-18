#!/usr/bin/python
import os,sys
import SimpleHTTPServer, BaseHTTPServer, httplib
import SocketServer

# Now change the directory
os.chdir("dest")

PORT = 8002

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()

class StoppableHttpRequestHandler (SimpleHTTPServer.SimpleHTTPRequestHandler):
    """http request handler with QUIT stopping the server"""

    def do_QUIT (self):
        """send 200 OK response, and set server.stop to True"""
        self.send_response(200)
        self.end_headers()
        self.server.stop = True


class StoppableHttpServer (BaseHTTPServer.HTTPServer):
    """http server that reacts to self.stop flag"""

    def serve_forever (self):
        """Handle one request at a time until stopped."""
        self.stop = False
        while not self.stop:
            self.handle_request()

def stop_server (self):
    """send QUIT request to http server running on localhost:<port>"""
    conn = httplib.HTTPConnection("localhost:%d" % PORT)
    conn.request("QUIT", "/")
    conn.getresponse()
