$(document).ready(function () {
    $("#buscar").click(function () {
        var userInput = $("#input").val().trim(); // Eliminar espacios en blanco al principio y al final
        $("#input").val("");

        // Verificar si la consulta del usuario está relacionada con medicina
        if (isMedicineQuestion(userInput)) {
            var userMessage = '<div class="chat-message user-message"><div class="message-bubble"><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">' + userInput + '</p></div></div>';
            $(".chat-content").append(userMessage);

            $(".chat-content").append('<div id="loading-message" class="chat-message ai-message"><div class="message-bubble"><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">Cargando...</p></div></div>');

            var requestData = {
                "model": "llama2",
                "prompt": "eres un medico asi que solo responderas preguntas sobre medicina , en caso de la que la pregunta no sea realcionada mediciana diras que eres un doctor y que solo responderas preguntas medicas "+userInput,
                "stream": false
            };

            $.ajax({
                url: "http://localhost:11434/api/generate",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(requestData),
                success: function (response) {
                    $("#loading-message").remove();
                
                    // Convertir el objeto response a texto
                    var responseText = JSON.stringify(response.response);
                
                    // Crear un mensaje para mostrar el texto en el chat
                    var aiMessageText = '<div class="chat-message ai-message"><div class="message-bubble"><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">AI (Doctor): ' + responseText + '</p></div></div>';
                
                    // Agregar el mensaje al contenido del chat
                    $(".chat-content").append(aiMessageText);
                },
                error: function (error) {
                    $("#loading-message").remove();

                    console.error("Error:", error);
                }
            });
        } else {
            // Si la consulta no está relacionada con medicina, mostrar un mensaje de error
            var errorMessage = '<div class="chat-message ai-message"><div class="message-bubble"><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">Lo siento, solo puedo responder preguntas relacionadas con medicina.</p></div></div>';
            $(".chat-content").append(errorMessage);
        }
    });
});

// Función para verificar si una pregunta está relacionada con medicina
function isMedicineQuestion(question) {
    // Convertir la pregunta a minúsculas para una comparación insensible a mayúsculas y minúsculas
    question = question.toLowerCase();

    // Lista de palabras clave relacionadas con medicina
    var medicineKeywords = ["salud", "medicina", "enfermedad", "tratamiento", "síntomas", "diagnóstico" , "hola"];

    // Verificar si alguna de las palabras clave está presente en la pregunta
    for (var i = 0; i < medicineKeywords.length; i++) {
        if (question.includes(medicineKeywords[i])) {
            return true; // Se encontró una palabra clave relacionada con medicina
        }
    }

    return false; // Ninguna palabra clave relacionada con medicina encontrada
}
