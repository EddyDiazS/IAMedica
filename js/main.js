function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    var chatMessages = document.getElementById('chat-messages');

    var userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = '<div class="message-content">' + userInput + '</div>';
    chatMessages.appendChild(userMessage);

    // Simulando la respuesta del bot después de un breve retraso (esto es donde tu lógica de IA entraría en juego)
    setTimeout(function() {
      var botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot-message');
      botMessage.innerHTML = `
        <div class="message-content">¡Claro! Estoy aquí para ayudarte. ¿En qué puedo asistirte?</div>
      `;
      chatMessages.appendChild(botMessage);
      
      // Desplazarse automáticamente hacia abajo para mostrar el último mensaje
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
    // Limpiar el cuadro de entrada después de enviar el mensaje
    document.getElementById('user-input').value = '';
  }