/**
 * Sajilo Custom JS (Add additional scripts here...)
 * ------------------
 * Author : Suman Shrestha
 * Author URL : https://sumanshresthaa.com.np
 */

jQuery( document ).ready( function( $ ) {
  
  $('.js-example-basic-single').select2();

  /* Select your element */
  var mainInput = document.getElementById("nepali-datepicker");
  
  /* Initialize Datepicker with options */
  mainInput.nepaliDatePicker();

  window.onload = function() {
                var mainInput = document.getElementById("nepali-datepicker");
                mainInput.nepaliDatePicker();
            };

  /* Select your element */


  $('.menu_ids').on('click', function(){

    // alert('adsfasdfasdf');
    //
    // return false;

      // var this_checked = $(this).is(':checked');
      // alert(this_checked.length);
      var index_no = $('.menu_ids').index($(this));

      var len_no = $('.menu_ids:checked').length;

      if($(this).is(':checked')){
          $('.menu_order:eq('+index_no+')').removeAttr('disabled').attr('value', (len_no));
      }else{
          $('.menu_order:eq('+index_no+')').attr('disabled','disabled').attr('value', '');
      }
  });


    $('#upload_form').on('submit', function(event){
        event.preventDefault();
        var count = 1;

        var action_url = $('#action_url').attr("value");
        var listing_url = $('#listing_url').attr("value");

        $('#msg_pop').html('<p class="alert alert-warning">Please wait, the file is uploading... <i class="fa fa-spinner fa-pulse fa-2x fa-fw margin-bottom" aria-hidden="true"></i></p>');

        $.ajax({
            url: action_url,
            method:"POST",
            data:new FormData(this),
            dataType:'JSON',
            async: true,
            contentType: false,
            cache: false,
            enctype: 'multipart/form-data',
            processData: false,
            success:function(data)
            {
                // console.log('Data: '+data);
                //
                // return false;

                // console.log(count++);

                if(data.contain != ''){
                    $('#pupup_container .row:first').prepend(data.contain);
                    $('#msg_pop').html('<p class="alert '+data.class_name+'">'+data.message+'</p>');
                    $('#pupup_container .row input:first').attr('checked', 'checked');
                    // console.log('10')
                    // console.log(data.contain);
                    return true;
                }else{
                    $('#msg_pop').html('<p class="alert '+data.class_name+'">'+data.message+'</p>');
                    console.log('0');
                    return false;
                }
            }
        });
        event.stopImmediatePropagation();
        return false;
    });

    // $('#pupup_container')

    $('#myPopup .cross').on('click', function(){
        $('#myPopup').toggleClass("show");
        $('#pupup_container').html('');
    });

    $('#btn_submit').on('click', function(event){
        event.preventDefault();
        var inp_id = $('input[name="pii"]:checked').attr('id');

        var inp_val = $('#img_'+inp_id).html();

        // console.log('ID: '+inp_id+'Val: '+inp_val);

        // return false;

        if(inp_val !== undefined){
            $('#msg_pop').html('');
            $('#pop_image_final').attr('value', inp_id);
            $('.media_image #preview_img').html(inp_val);
            $('#preview_all').css('display', 'block');
            $('#browse_image').css('display', 'none');
        }else{
            $('#msg_pop').html('<p class="alert alert-warning">Please upload the file first!</p>');
            $('#preview_all').css('display', 'none');
            $('#browse_image').css('display', 'block');
            return false;
        }

        $('#myPopup').toggleClass("show");
        $('#pupup_container').html('');

        return false;

    });

    $('#search_item').on('keyup', function(event){
        event.preventDefault();
        var search_item = $('#search_item').val().toLowerCase();

        // console.log(search_item);

        var sendInfo = {
            page: 1,
            search_item: search_item
        };

        // url:"{{ url('/').'/dashboard/medialibrary/action' }}",

        var action_url = $('#action_url').attr("value");
        var listing_url = $('#listing_url').attr("value");

        $.ajax({
            type: "POST",
            url: listing_url,
            dataType: "JSON",
            data: sendInfo,
            success: function (msg) {
                console.log(msg);

                if (msg.contain != '') {
                    $('#pupup_container').html(msg.contain);
                    // location.reload(true);

                    var current_page = parseInt(msg.cur_page);
                    var total_pages = parseInt(msg.total_page);

                    // console.log(current_page);
                    // console.log('-');
                    // console.log(total_pages);

                    if(current_page > 1 && total_pages >= current_page){
                        $('#btn_previous').css('display', 'block');
                        $('#btn_previous').attr('value', (current_page - 1));
                    }else{
                        $('#btn_previous').css('display', 'none');
                        $('#btn_previous').attr('value', '1');
                    }
                    if(total_pages > current_page){
                        $('#btn_next').css('display', 'block');
                        $('#btn_next').attr('value', (current_page + 1));
                    }else{
                        $('#btn_next').css('display', 'none');
                        $('#btn_next').attr('value', '2');
                    }
                } else {
                    console.log("No message Found");
                }
            },
        });

        return false;

    });


    $('#preview_img_remove').on('click', function(){
        $('#pop_image_final').attr('value', '');
        $('.media_image #preview_img').html('');
        $('#preview_all').css('display', 'none');
        $('#browse_image').css('display', 'block');

    });


});

function popFunction(cpage=1) {
    // var popup = document.getElementById("myPopup");
    $('#myPopup').addClass("show");
    // popup.classList.toggle("show");

    var search_item = $('#search_item').val();

    var sendInfo = {
        page: cpage,
        search_item: search_item
    };

    var action_url = $('#action_url').attr("value");
    var listing_url = $('#listing_url').attr("value");

    $.ajax({
        type: "GET",
        url: listing_url,
        dataType: "JSON",
        data: sendInfo,
        success: function (msg) {
            console.log(msg);

            if (msg.contain != '') {
                $('#pupup_container').html(msg.contain);
                // location.reload(true);

                var current_page = parseInt(msg.cur_page);
                var total_pages = parseInt(msg.total_page);

                // console.log(current_page);
                // console.log('-');
                // console.log(total_pages);

                if(current_page > 1 && total_pages >= current_page){
                    $('#btn_previous').css('display', 'block');
                    $('#btn_previous').attr('value', (current_page - 1));
                }else{
                    $('#btn_previous').css('display', 'none');
                    $('#btn_previous').attr('value', '1');
                }
                if(total_pages > current_page){
                    $('#btn_next').css('display', 'block');
                    $('#btn_next').attr('value', (current_page + 1));
                }else{
                    $('#btn_next').css('display', 'none');
                    $('#btn_next').attr('value', '2');
                }
            } else {
                alert("No message found !");
            }
        },
    });

}
