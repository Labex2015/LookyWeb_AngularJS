var mainApp = angular.module('mainApp');

		mainApp.factory('socket', function(){
			var socket = io.connect("http://192.168.1.101:3000")
			return socket;
		})

		mainApp.controller('ChatController', function($scope, $route, socket, interaction, userService, currentRoom){

				if(interaction.chat.chatRoom != currentRoom.room){
					socket.emit('switchRoom', interaction.chat.chatRoom);
				}
				$scope.count = 0;
				$scope.currentInteraction = interaction.chat;

				var id = interaction.chat.chatRoom;
				currentRoom.room = id;
				var name = "",
					email = "",
					img = "",
					friend = "";

				var section = $(".section"),
					footer = $("footer"),
					onConnect = $(".connected"),
					inviteSomebody = $(".invite-textfield"),
					personInside = $(".personinside"),
					chatScreen = $(".chatscreen"),
					left = $(".left"),
					noMessages = $(".nomessages"),
					tooManyPeople = $(".toomanypeople");

				var chatNickname = $(".nickname-chat"),
					leftNickname = $(".nickname-left"),
					loginForm = $(".loginForm"),
					yourName = $("#yourName"),
					yourEmail = $("#yourEmail"),
					hisName = $("#hisName"),
					hisEmail = $("#hisEmail"),
					chatForm = $("#chatform"),
					textarea = $("#message"),
					messageTimeSent = $(".timesent"),
					chats = $(".chats");

				var ownerImage = $("#ownerImage"),
					leftImage = $("#leftImage"),
					noMessagesImage = $("#noMessagesImage");

				socket.emit('load', id);
				socket.on('img', function(data){
					img = data;
				});

				socket.on('peopleinchat', function(data){

					showMessage("personinchat",data);

					name = userService.user.username;

					email = userService.user.email;
					socket.emit('login', {user: name, avatar: email, id: id});

				});

				socket.on('startChat', function(data){
					showMessage("chatStarted");
					if($scope.count == 0){
						socket.emit('oldmessage', {id: id})
						$scope.count = $scope.count + 1;
					}

				});

				socket.on('leave',function(data){

				});

				socket.on('messages',function(data){
					var i = 0;
					for(i = 0; i < data.msg.length; i++){
						createChatMessage(data.msg[i].msg, data.msg[i].user,data.msg[i].img, moment());
					}
				});

				socket.on('tooMany', function(data){

					if(data.boolean && name.length === 0) {
						showMessage('tooManyPeople');
					}
				});

				socket.on('receive', function(data){

					showMessage('chatStarted');

					if(data.msg.trim().length) {
						createChatMessage(data.msg, data.user, data.img, moment());
						scrollToBottom();
					}
				});

				textarea.keypress(function(e){

					if(e.which == 13) {
						e.preventDefault();
						chatForm.trigger('submit');
					}

				});

				function moment(){
					$(this).data('time');
				};

				function fromNow(){
				};

				chatForm.on('submit', function(e){

					e.preventDefault();

					showMessage("chatStarted");

					if(textarea.val().trim().length) {
						createChatMessage(textarea.val(), name, img, moment());
						scrollToBottom();
						socket.emit('msg', {msg: textarea.val(), user: name, img: img, id:id});

					}
					textarea.val("");
				});

				setInterval(function(){

					messageTimeSent.each(function(){
						var each = moment($(this).data('time'));
					});

				},60000);

				function createChatMessage(msg,user,imgg,now){

					var who = '';

					if(user!==name) {
						who = 'me';
					}
					else {
						who = 'you';
					}



					var li = $(
						'<li class="col-lg-12 ' + who + '">'+
							'<div class="image col-lg-1 text-center">' +
								'<img class="img-responsive img-circle" src=' + imgg + ' />' +
								'<b></b>' +
								'<i class="timesent" data-time=' + now + '></i> ' +
							'</div>' +
							'<p></p>' +
						'</li>');

					li.find('p').text(msg);
					li.find('b').text(user);

					chats.append(li);

					messageTimeSent = $(".timesent");
				}

				function scrollToBottom(){
					$("html, body").animate({ scrollTop: $(document).height()-$(window).height() },1000);
				}

				function isValid(thatemail) {

				}

				function showMessage(status,data){

					if(status === "connected"){

						section.children().css('display', 'none');
						onConnect.fadeIn(1200);
					}

					else if(status === "inviteSomebody"){

						// Set the invite link content
						$("#link").text(window.location.href);

						onConnect.fadeOut(1200, function(){
							inviteSomebody.fadeIn(1200);
						});
					}

					else if(status === "personinchat"){


						personInside.fadeIn(1200);

						chatNickname.text(data.user);
						ownerImage.attr("src",data.avatar);
					}

					else if(status === "youStartedChatWithNoMessages") {

						left.fadeOut(1200, function() {
							inviteSomebody.fadeOut(1200,function(){
								noMessages.fadeIn(1200);
								footer.fadeIn(1200);
							});
						});

						friend = data.users[1];
					}

					else if(status === "heStartedChatWithNoMessages") {
						personInside.fadeOut(1200,function(){
							noMessages.fadeIn(1200);
							footer.fadeIn(1200);
						});

						friend = data.users[0];
						noMessagesImage.attr("src",data.avatars[0]);
					}

					else if(status === "chatStarted"){

						section.children().css('display','none');
						chatScreen.css('display','block');
					}

					else if(status === "somebodyLeft"){

						leftImage.attr("src",data.avatar);
						leftNickname.text(data.user);

						section.children().css('display','none');
						footer.css('display', 'none');
						left.fadeIn(1200);
					}

					else if(status === "tooManyPeople") {

						section.children().css('display', 'none');
						tooManyPeople.fadeIn(1200);
					}
				}
		})