let localVideo = document.getElementById('local_video');
let remoteVideo = document.getElementById('remote_video');
let localStream = null;
let peerConnection = null;
let textForSendSdp = document.getElementById('text_for_send_sdp');
let textToReceiveSdp = document.getElementById('text_for_receive_sdp');

// start local video
function startVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(function (stream) { // success
            localStream = stream;
            localVideo.src = window.URL.createObjectURL(localStream);
        }).catch(function (error) { // error
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });
}