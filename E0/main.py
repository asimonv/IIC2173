from flask import Flask, request
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'

io = SocketIO(app, cors_allowed_origins='*')

CORS(app)

clients = dict()

@app.route('/')
def sessions():
    return 'hi from /'


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@io.on('new connection')
def connect():
    print('someone connected')
    clients[request.sid] = request.sid
    io.emit('new-id', {'data': clients[request.sid]}, room=request.sid)

@io.on('new-message')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    new_message = {**json, 'timestamp': str(datetime.now()), 'sent_by': clients[request.sid]}
    print('received my event: ' + str(new_message))
    io.emit('new-message', new_message, callback=messageReceived)


if __name__ == '__main__':
    io.run(app, host="0.0.0.0", debug=True, port=5000)
