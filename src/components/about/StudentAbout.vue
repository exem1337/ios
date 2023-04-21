<template>
  <div class="about">
    <h5>Прохождение дисциплин</h5>
    <p>
      Нажмите на кнопку "Дисциплины" в меню в верхней части экрана. Откроется окно, с доступными вам дисциплинами. Выберите доступную дисциплину из списка дисциплин.
    </p>
    <div class="img-wrapper">
      <img src="images/student-disciplines.png" alt="#">
    </div>
    <p>
      Откроется просмотр дисциплины. В левой части экрана показан список тем для изучения и кнопка "Пройти тестирование". В верхней левой части экрана находятся кнопки переключения страниц обучающего материала. После изучения, необходимо пройти тестирование по изученной теме.
    </p>
    <div class="img-wrapper">
      <img src="images/student-disciplines-theme.png" alt="#">
    </div>
    <p>
      При прохождении тестирования, выберите правильный ответ на вопрос и нажмите "Продолжить"
    </p>
    <div class="img-wrapper">
      <img src="images/student-disciplines-test.png" alt="#">
    </div>
    <p>
      После ответа на все вопросы тестирования, появится окно с результатами тестирования.
    </p>
    <div class="img-wrapper">
      <img src="images/student-disciplines-test-results.png" alt="#">
    </div>
    <p>
      Нажав на кнопку "Подробнее", откроется окно с подробностями анализа результатов прохождения тестирования с трассировкой правил математического метода.
    </p>
    <div class="img-wrapper">
      <img src="images/student-disciplines-test-results-grahs.png" alt="#">
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.about {
  h5 {
    font-size: 24px;
    height: fit-content;  
    width: fit-content;
    color: #616161;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
  }

  .img-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    img {
      max-width: 100%;
    }
  }
}
</style>