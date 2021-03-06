function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }
    
    var str = shaderScript.textContent;

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

// Usage: 
// 1. Define shader code in two scripts as follows
// <script id="shader-fs" type="x-shader/x-fragment">
//    fragment shader code
// </script>
// <script id="shader-vs" type="x-shader/x-vertex">
//    vertex shader code
// </script>
// Get the compiled program with
// var program = getShaderProgram("shader-vs","shader-fs");
function getShaderProgram(vshader, fshader) {
    var vertexShader = getShader(gl, vshader);
    var fragmentShader = getShader(gl, fshader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
        return undefined;
    }
    
    return shaderProgram;
}