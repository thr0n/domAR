import * as d3 from 'd3'

import './demo.css'
import data from './data.json'

const Argon = window.Argon;
const THREE = window.THREE;

const app = Argon.init();
app.view.element.style.zIndex = 0;

const renderer = new THREE.CSS3DArgonRenderer();
const hud = new THREE.CSS3DArgonHUD();

app.view.element.appendChild(renderer.domElement);
app.view.element.appendChild(hud.domElement);

const camera = new THREE.PerspectiveCamera();
const scene = new THREE.Scene();

const root = new THREE.Object3D()
const userLocation = new THREE.Object3D();
userLocation.add(root)

scene.add(userLocation);
scene.add(camera);

app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);

init()

function init() {

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const selection = d3.selectAll('.element').data(data)

    const enterDiv = selection.enter()
        .append('div')
        .attr('class', 'element')

    const enterSvg = enterDiv.append("svg")
        .attr("width", 160)
        .attr("height", 160)

    enterSvg.append("circle")
        .attr("class", "radar")
        .attr("cx", 80)
        .attr("cy", 80)
        .attr("r", 80)
        .attr("fill", d => color(d.name))

    enterDiv.each(setData)
    enterDiv.each(objectify)

    function objectify(d, i) {
        const {position, rotation} = d.sphere

        const object = new THREE.CSS3DObject(this)
        d.object = object

        Object.assign(object.position, position)
        //Object.assign(object.rotation, rotation)
        object.rotation.x = rotation.x
        object.rotation.y = rotation.y
        object.rotation.z = rotation.z

        root.add(object)
    }

    function setData(d, i) {
        let vector, phi

        const random = new THREE.Object3D()
        random.position.x = Math.random() * 4000 - 2000
        random.position.y = Math.random() * 4000 - 2000
        random.position.z = Math.random() * 4000 - 2000

        d.random = random

        const sphere = new THREE.Object3D()
        vector = new THREE.Vector3()
        phi = Math.acos(-1 + 2 * i / data.length)

        const theta = Math.sqrt((data.length - 1) * Math.PI) * phi

        sphere.position.x = 800 * Math.cos(theta) * Math.sin(phi)
        sphere.position.y = 800 * Math.sin(theta) * Math.sin(phi)
        sphere.position.z = 800 * Math.cos(phi)

        vector.copy(sphere.position).multiplyScalar(2)
        sphere.lookAt(vector)

        d.sphere = sphere

        const helix = new THREE.Object3D()
        vector = new THREE.Vector3()
        phi = (i + 12) * 0.25 + Math.PI

        helix.position.x = 1000 * Math.sin(phi)
        //helix.position.y = -(i * 8) + 500
        helix.position.y = -(50 * 8) + 500
        helix.position.z = 1000 * Math.cos(phi)

        vector.x = helix.position.x * 2
        vector.y = helix.position.y
        vector.z = helix.position.z * 2

        helix.lookAt(vector)

        d.helix = helix

        const grid = new THREE.Object3D()
        grid.position.x = (i % 5) * 400 - 800
        grid.position.y = -(Math.floor(i / 5) % 5) * 400 + 800
        grid.position.z = Math.floor(i / 25) * 1000 - 2000

        d.grid = grid
    }
}

app.updateEvent.addEventListener(function () {
    var userPose = app.context.getEntityPose(app.context.user);

    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        userLocation.position.copy(userPose.position);
    }
});

var viewport = null;
var subViews = null;
app.renderEvent.addEventListener(function () {
    viewport = app.view.getViewport();
    subViews = app.view.getSubviews();
    window.requestAnimationFrame(renderFunc);
});

function renderFunc() {
    renderer.setSize(viewport.width, viewport.height);
    hud.setSize(viewport.width, viewport.height);

    if (subViews.length > 1 || !app.focus.hasFocus) {
        hud.domElement.style.display = 'none';
    } else {
        hud.domElement.style.display = 'block';
    }

    for (var _i = 0, _a = subViews; _i < _a.length; _i++) {
        var subview = _a[_i];
        var frustum = subview.frustum;

        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        camera.fov = THREE.Math.radToDeg(frustum.fovy);

        var _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        renderer.setViewport(x, y, width, height, _i);
        hud.setViewport(x, y, width, height, _i);

        renderer.render(scene, camera, _i);
        hud.render(_i);
    }
}
