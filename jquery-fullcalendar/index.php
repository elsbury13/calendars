<?php
include '../connect.php';
require_once '../eventsClass.php';

$events = new Events($pdo);
$events = $events->getAll();
?>

<!DOCTYPE html>
<html>
    <head>
        <link href='assets/css/fullcalendar.css' rel='stylesheet' />
        <link href='assets/css/fullcalendar.print.css' rel='stylesheet' media='print' />
    </head>
<body>
    <div id='calendar'></div>
</body>
<script src='assets/js/jquery.min.js'></script>
<script src='assets/js/jquery-ui.custom.min.js'></script>
<script src='assets/js/fullcalendar.min.js'></script>
<script>

 $(document).ready(function() {

  var date = new Date()
  var d = date.getDate()
  var m = date.getMonth()
  var y = date.getFullYear()

  var calendar = $('#calendar').fullCalendar({
	editable: true,
	header: {
	  left: 'prev,next today',
	  center: 'title',
	  right: 'month,agendaWeek,agendaDay'
	},
    displayEventTime: false,

	events: <?php echo $events ?>,

	// Convert the allDay from string to boolean
	eventRender: function(event) {
	  if (event.allDay === 'true') {
		event.allDay = true
	  } else {
		event.allDay = false
	  }
	},
	selectable: true,
	select: function(start, end, allDay) {
	  var title = prompt('Title:')
	  var description = prompt('Description:')
      var url = prompt('URL:')
	  if (title) {
		start = $.fullCalendar.formatDate(start, "yyyy-MM-dd HH:mm:ss")
		end = $.fullCalendar.formatDate(end, "yyyy-MM-dd HH:mm:ss")
		$.ajax({
          data: { add: 1, title: title, description: description, start: start, end: end, url: url },
		  url: '../events.php',
		  type: "POST"
		})
		calendar.fullCalendar('renderEvent',
		{
		  title: title,
		  start: start,
		  end: end,
		  allDay: allDay
		},
		true)
	  }
	  calendar.fullCalendar('unselect')
   },

	editable: true,
	eventDrop: function(event) {
	  start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd HH:mm:ss")
	  end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd HH:mm:ss")
      if (end === '') {
          end = start
      }
	  $.ajax({
		url: '../events.php',
        data: { update: 1, title: event.title, start: start, end: end, id: event.id },
		type: "POST"
	  })
	},

	eventResize: function(event) {
	  start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd HH:mm:ss")
	  end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd HH:mm:ss")
	  $.ajax({
		url: '../events.php',
        data: { update: 1, title: event.title, start: start, end: end, id: event.id },
		type: "POST"
	  })
    },

    eventClick: function(event) {
      start = $.fullCalendar.formatDate(event.start, "HH:mm")
	  end = $.fullCalendar.formatDate(event.end, "HH:mm")
      date = $.fullCalendar.formatDate(event.start, "dd-MM-yyyy")

      var data =
        event.title + '\r\nDescription ' + event.description +
        '\r\nDate ' + date + '\r\nStart Time ' + start + '\r\End Time ' +
        end + '\r\URL ' + event.url

        alert(data)

      if (event.url) {
        return false
      }

      // change the border color just for fun
      $(this).css('border-color', 'red')
    }
  })
 })

</script>
</html>
