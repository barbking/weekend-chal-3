console.log('sourced jq');

$(document).ready(docReady);

function docReady (){
  console.log('in docReady');
  $('#addtask').on('click', addTask);
  $('body').on('click', '#complete', check);
  // $('body').on('click','#delete', deleteTask);
  getTaskTable();
}

//browser to start with all db table data loaded to DOM
function getTaskTable (){
  console.log ('in getTaskTable');
  $.ajax({
    method: 'GET',
    url: '/allTasks',
    success: function (res) {
      // var options = '<select><option value="select">Options</option><option value="commpleted">Mark Completed</option><option value="delete">Delete</option></select>';
      $('#tasks, #taskinput').empty();
      for (i=0; i<res.length; i++) {
        var options = '<button type="button" id="complete"'+'data-id="'+res[i].id+'">Check/UnCheck</button><button type="button" id="delete"'+'data-id="'+res[i].id+'">Delete</button>';
        if (res[i].active){
          $('#tasks').append('<div class="false"><p><span>[&#10003;]</span>'+'  '+ res[i].task+options+'</p></div>');
        } else {
          $('#tasks').append('<div class="false"><p><span>[]</span>'+'  '+ res[i].task+options+'</p></div>');
        }
      }
    }
  });//end of ajax get
}//end of getTaskTable

function addTask (){
  console.log('in refreshTable func');
  var taskToAdd = {
    taskInput: $('#taskinput').val()
  };
  console.log(taskToAdd);
  $.ajax ({
    method: 'POST',
    url: '/addTask',
    data: taskToAdd,
    success: function (res) {
      console.log('refreshTable', res);
      getTaskTable();
    }
  });//end ajax post
    $('#taskinput').empty();
}
//
function check (){
  console.log('in check func');
  var checkItemId = $(this).data('id');//get table ID
  var checkItem = {
    id: checkItemId
  };
  $.ajax ({
    method: 'POST',
    url: '/checkTask',
    data: checkItem,
    success: function (res) {
      console.log('refreshTable after check', res);
      getTaskTable();
    }
  });

}
