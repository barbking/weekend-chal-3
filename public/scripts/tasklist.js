console.log('sourced jq');

$(document).ready(docReady);

function docReady (){
  console.log('in docReady');
  $('#addtask').on('click', addTask);
  $('body').on('click', '#check', check);
  $('body').on('click','#delete', deleteTask);
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
        var options = '<button type="button" id="check"'+'data-id="'+res[i].id+'">Check/UnCheck</button><button type="button" id="delete"'+'data-id="'+res[i].id+'">Delete</button>';
        if (res[i].active){
          options = '<button type="button" class="true" id="check"'+'data-id="'+res[i].id+'">Check/UnCheck</button><button type="button" id="delete"'+'data-id="'+res[i].id+'">Delete</button>';
          $('#tasks').append('<div class="true"><p><span>[&#10003;]</span>'+'  '+ res[i].task+options+'</p></div>');
        } else {
          options = '<button type="button" class="false" id="check"'+'data-id="'+res[i].id+'">Check/UnCheck</button><button type="button" id="delete"'+'data-id="'+res[i].id+'">Delete</button>';
          $('#tasks').append('<div class="false"><p><span>[&#8199;]</span>'+'  '+ res[i].task+options+'</p></div>');
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
}//end of addTask func

//when click check/uncheck button, switch bewteen completed(true) and not completed(false)
function check (){
  console.log('in check func');
  var checkTaskId = $(this).data('id');//get table ID
  var swapVal = $(this).attr("class");
  console.log(swapVal);
  var active;
  if (swapVal==="true") {
    active = 'false';
  } else {
    active = 'true';
  }
  var checkItem = {
    id: checkTaskId,
    active: active
  };
  console.log(checkItem);
  $.ajax ({
    method: 'POST',
    url: '/checkTask',
    data: checkItem,
    success: function (res) {
      getTaskTable();
    }
  });//end of ajax
}//end of check func

//delete task on delete button click
function deleteTask (){
  console.log('in deleteTask func');
  //else/if to propmt for confirm task delete
  if (confirm('Are you sure you want to delete this task?')) {
    var deleteTaskId = $(this).data('id');//get table ID
    var deleteTask = {
      id: deleteTaskId,
    };
    $.ajax ({
      method: 'POST',
      url: '/deleteTask',
      data: deleteTask,
      success: function (res){
        getTaskTable();
      }
    });//end ajax
  } else {
    // Do nothing!
 }//end else/if
}//end deleteTask func
