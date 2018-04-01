let events = localStorage.getItem('events')

let displayEvents = (eventsData) =>{
  let facesAmmount = 4

  $('.side').html('');

  if(eventsData.length < 4) {
    facesAmmount = eventsData.length;
  }

  for(let i = 0; i < facesAmmount; i++){
    let templateString = '';
    var readableDate = new Date(eventsData[i].date);

    templateString += '<div class="event" data-order=' + i + '>';
    templateString += '<p class="display-title">';
    templateString += '<span>Titlu: </span>';
    templateString += '<span>' + eventsData[i].title + '</span>';
    templateString += '</p>';
    templateString += '<p class="display-date">';
    templateString += '<span>Data : </span>';
    templateString += '<span>' + readableDate.getDate() + '-' + (readableDate.getMonth() + 1) + '-' + readableDate.getFullYear() +'</span>';
    templateString += '</p>';
    templateString += '<p class="display-description">';
    templateString += '<span>Description : </span>';
    templateString += '<span>' + eventsData[i].description + '</span>';
    templateString += '</p>';
    templateString += '<button type="button" class="remove">';
    templateString += 'Remove';
    templateString += '</button>';
    templateString += '<button type="button" class="edit">';
    templateString += 'Edit';
    templateString += '</button>';
    templateString += '</div>';

    $($('.side')[i]).html(templateString);
  }
}

if(events === null) {
  events = [];
} else {
  events = JSON.parse(events);

  events.sort((a,b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    return a - b;
  });

  displayEvents(events);
}

let props = 'transform WebkitTransform'.split(' '),
prop,
el = document.createElement('div');

for(let i = 0, l = props.length; i < l; i++) {
  if(typeof el.style[props[i]] !== "undefined") {
    prop = props[i];
    break;
  }
}

let xAngle = 0, yAngle = 0;
$('body').keydown((evt) => {
  switch(evt.keyCode) {
    case 39: // left
    yAngle -= 90;
    break;

    case 40: // up
    xAngle += 90;
    evt.preventDefault();
    break;

    case 37: // right
    yAngle += 90;
    break;

    case 38: // down
    xAngle -= 90;
    evt.preventDefault();
    break;
  };
  document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
});

$('.add').click(() => {
  let eventDetails = {}
  const eventTitle = $('.title').val();
  const eventDate = new Date($('.date').val());
  const eventDescription = $('.description').val();

  eventDetails.title = eventTitle;
  eventDetails.date = eventDate;
  eventDetails.description = eventDescription;

  events.push(eventDetails);
  displayEvents(events);
});

$('.remove').click((evt) => {
  let order = $(evt.target).closest('div').attr('data-order');

  events.splice(order, 1);
  localStorage.setItem('events' , JSON.stringify(events));
  displayEvents(events)
});
