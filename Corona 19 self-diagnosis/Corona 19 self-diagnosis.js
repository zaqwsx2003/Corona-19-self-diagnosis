// 문제 객체(생성자 함수)
function Question(text) {
    this.text = text; // 질문 텍스트
    this.choice = ['전혀없었다', '며칠간 지속', '일주일 지속', '2주동안 계속 지속']; // 선택할 답들(배열)
 }
 
 // 퀴즈 정보 객체
 function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 문제
    this.questionIndex = 0; // 문제 번호
 }
 
 var questions = [
    new Question('기분이 가라앉거나 우울하고, 희망이 없다는 생각을 자주 한다.'),
    new Question('평소에 하는 일인데도 재미가 없고 흥미가 없게 느껴진다.'),
    new Question('잠들기가 너무 어렵거나, 잠을 너무 많이 잔다.'),
    new Question('평소보다 식욕이 현저히 줄었거나, 늘었다.'),
    new Question('항상 피곤하고 기운이 없다.ㅤㅤㅤㅤㅤㅤㅤ'),
    new Question('내가 잘못했거나 실패했다는 생각이 든다.'),
    new Question('차라리 죽는 게 더 낫겠다고 생각하거나 자해에 대해 생각했다.'),
    new Question('다른 사람이 눈치챌 정도로 평소보다 말과 행동이 느려졌다.'),
    new Question('안절부절못해서 가만히 있을 수 없다.ㅤㅤㅤㅤㅤㅤ'),
 ];
 
 // 퀴즈 객체 생성
 var quiz = new Quiz(questions);
 
 // 문제 출력 함수
 function updateQuiz() {
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');
 
    // 문제 출력
    question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text;
 
    // 선택 출력
    for (var i = 0; i < 4; i++) {
       choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
 
    progress();
 }
 
 function progress() {
    var progress = document.getElementById('progress');
    progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
 }
 
 var btn = document.querySelectorAll('.btn');


 // 입력 및 정답 확인 함수
 function checkAnswer(i) {
    btn[i].addEventListener('click', function() {
       quiz.score += i;
       
       if (quiz.questionIndex < quiz.questions.length - 1) {
          quiz.questionIndex++;
          updateQuiz();
       } else {
          result();
       }
    });
 }
 
 function result() {
    var quizDiv = document.getElementById('quiz');
    var score = parseInt(quiz.score);
    var txt = '<h1>결과</h1>' + '<h2 id="score">당신의 점수: ' + score + '/' + (quiz.questions.length * 3) + '<br></h2>';
 
    quizDiv.innerHTML = txt;
 
    // 점수별 결과 텍스트
    if (score <= 4) {
       txt += '<h2>우울증이 아닙니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 5 && score <= 9) {
       txt += '<h2>가벼운 우울증입니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 10 && score <= 14) {
       txt += '<h2>중간 정도의 우울증입니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 15 && score <= 19) {
       txt += '<h2>치료가 필요합니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 20) {
       txt += '<h2>적극적인 치료가 필요합니다.</h2>';
       quizDiv.innerHTML =  txt;
    }
 }
 
 for (var i = 0; i < btn.length; i++) {
    checkAnswer(i);
 }
 
 updateQuiz();