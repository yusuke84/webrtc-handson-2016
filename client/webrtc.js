let localVideo = document.getElementById('local_video');
let remoteVideo = document.getElementById('remote_video');
let localStream = null;
let peerConnection = null;
let textForSendSdp = document.getElementById('text_for_send_sdp');
let textToReceiveSdp = document.getElementById('text_for_receive_sdp');

// 互換性対応
RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;

// getUserMediaでカメラ、マイクにアクセス
function startVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(function (stream) { // success
            playVideo(localVideo,stream);
            localStream = stream;
        }).catch(function (error) { // error
            console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });
}

// Videoの再生を開始する
function playVideo(element, stream) {
    if ('srcObject' in element) {
        element.srcObject = stream;
    }
    else {
        element.src = window.URL.createObjectURL(stream);
    }
    element.play();
}

// Connectボタンが押されたら処理を開始
function connect() {
    if (! peerConnection) {
        console.log('make Offer');
        makeOffer();
    }
    else {
        console.warn('peer already exist.');
    }
}

// Offer SDPを生成する
function makeOffer() {
    peerConnection = prepareNewConnection();
    peerConnection.createOffer()
        .then(function (sessionDescription) {
            console.log('createOffer() succsess in promise');
            return peerConnection.setLocalDescription(sessionDescription);
        }).then(function() {
            console.log('setLocalDescription() succsess in promise');
    }).catch(function(err) {
        console.error(err);
    });
}