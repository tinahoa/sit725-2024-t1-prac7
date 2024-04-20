document.addEventListener('DOMContentLoaded', function () {
  // Initialize modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});

  const getcards = () => {
    $.get('/api/cards', (response) => {
      if (response.statusCode == 200) {
        addCards(response.cards)
      }
    })
  }

  // Function to add cards dynamically
  function addCards(cardList) {
    var cardContainer = document.getElementById('card-container');
    cardList.forEach(function (card) {
      var cardHtml = `
          <div class="col s12 m4">
            <div class="card">
              <div class="card-image">
                <img src="${card.image}" alt="${card.title}" height="200" width="100%">
              </div>
              <div class="card-content">
                <span class="card-title">${card.title}</span>
                <p>${card.description}</p>
              </div>
            </div>
          </div>`;
      cardContainer.innerHTML += cardHtml;
    });
  }

  getcards();

  // Form Submission Handling
  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    var title = document.getElementById('name').value;
    var image = document.getElementById('image').value;
    var description = document.getElementById('description').value;

    $.ajax({
      type: 'POST',
      url: '/api/submitForm',
      data: JSON.stringify({ title, image, description }),
      contentType: 'application/json',
      success: function (response) {
        console.log('Form submitted successfully:', response);
        // Optionally, you can show a success message to the user
      },
      error: function (error) {
        console.error('Error submitting form:', error);
        // Optionally, you can show an error message to the user
      }
    });


  });
});
