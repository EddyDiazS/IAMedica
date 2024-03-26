$(document).ready(function () {
  $("#buscar").on("click", () => {
  
    var x = `Digita todo en español y eres un medico profesional y debes responder todo lo que te pidan pero solamente de medicina`
    console.log(x)
    var y = {
      "model": "llama2",
      "prompt": x,
      "stream": false
    }
    $.ajax({
      method: "POST",
      url: "http://localhost:11434/api/generate",
      contentType: "application/json",
      data: JSON.stringify(y),
      success: function (data) {
        console.log(data)
        $("#output").html(`<p> ${data.response} </p>`)
      }
    })
  })
})

