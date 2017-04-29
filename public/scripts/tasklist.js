console.log('sourced jq');

$(document).ready(docReady);

function docReady (){
  console.log('in docReady');
  $('#addtask').on('click', addTask);
  getTaskTable();
}

//browser to start with all db table data loaded to DOM
function getTaskTable (){
  console.log ('in getTaskTable');
  $.ajax({
    method: 'GET',
    url: '/allTasks',
    success: function (res) {
      $('#tasks').empty();
      for (i=0; i<res.length; i++) {
      $('#tasks').append('<div data-id="'+res[i].id+'"><p>[]'+'  '+ res[i].task+'</p></div>');
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
  });
}
