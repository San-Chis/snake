// Отримуємо доступ до елементу <canvas> за його ідентифікатором і отримуємо 2D контекст для малювання на ньому
const canvas = document.getElementById('game')
const type = canvas.getContext('2d')

// Відобразимо стартовий екран з написом "Start"
type.fillStyle = 'black'
type.fillRect(0, 0, canvas.width, canvas.height)

type.fillStyle = 'white'
type.font = '40px Arial'
type.fillText('Press any key to start', canvas.width / 5, canvas.height / 2)

// Додаєм слухача подій для стартового екрану
document.addEventListener('keydown', startGame)

let gameStarted = false

function startGame(event) {
  // Якщо гра не розпочалася і гравець натиснув будь-яку клавішу
  if (!gameStarted) {
    gameStarted = true
    document.removeEventListener('keydown', startGame)
  }
}

// Завантажуємо зображення ігрового поля і зображення їжі за допомогою об'єктів
const field = new Image()
field.src = 'img/field.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'

//Встановлюємо розмір одного "боксу" (який буде однією клітинкою на ігровому полі) і початковий рахунок
let box = 29
let score = 0

//Створюємо об'єкт food для зберігання позиції їжі і масив snake для зберігання координат змійки:
let food = {
  x: Math.floor(Math.random() * 16 + 2) * box,
  y: Math.floor(Math.random() * 16 + 2) * box,
}

let snake = []
snake[0] = {
  x: 10 * box,
  y: 10 * box,
}

//Додаємо обробник подій для визначення напрямку руху змійки за допомогою клавіш зі стрілками:
document.addEventListener('keydown', direction)

let dir

function direction(event) {
  if (event.keyCode === 37 && dir != 'right') dir = 'left'
  else if (event.keyCode === 38 && dir != 'downt') dir = 'up'
  else if (event.keyCode === 39 && dir != 'left') dir = 'right'
  else if (event.keyCode === 40 && dir != 'up') dir = 'down'
}

//Функція eatTail перевіряє, чи зіткнулася змійка зі своїм хвостом:
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game)
  }
}

//Функція drawGame малює ігрове поле, змійку, рахунок і обробляє їжу і рух змійки:
function drawGame() {
  // Очищаємо поле
  type.drawImage(field, 0, 0)

  // Малюємо їжу
  type.drawImage(foodImg, food.x, food.y)

  // Малюємо змійку
  for (let i = 0; i < snake.length; i++) {
    type.fillStyle = i == 0 ? 'orange' : 'green'
    type.fillRect(snake[i].x, snake[i].y, box, box)
  }
  // Малюємо рахунок
  type.fillStyle = 'yellow'
  type.font = '35px  Arial'
  type.fillText(score, box * 1.5, box * 0.9)

  // Збираємо їжу
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (snakeX == food.x && snakeY == food.y) {
    score++
    food = {
      x: Math.floor(Math.random() * 16 + 2) * box,
      y: Math.floor(Math.random() * 16 + 2) * box,
    }
  } else {
    snake.pop()
  }
  // Перевіряємо, чи зіткнулася змійка зі стінами
  if (
    snakeX < 2 * box ||
    snakeX > box * 18 ||
    snakeY < 2 * box ||
    snakeY > box * 18
  ) {
    clearInterval(game)
    gameOver()
    return
  }

  // Встановлюємо новий напрямок руху змійки
  if (dir == 'left') snakeX -= box
  if (dir == 'right') snakeX += box
  if (dir == 'up') snakeY -= box
  if (dir == 'down') snakeY += box

  // Створюємо нову голову змійки
  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  // Перевіряємо, чи зіткнулася змійка зі своїм хвостом
  eatTail({ x: snakeX, y: snakeY }, snake)

  // Додаємо нову голову в масив змійки
  snake.unshift(newHead)

  //Додаємо функцію gameOver для відображення повідомлення про завершення гри.
  function gameOver() {
    type.fillStyle = 'black'
    type.fillRect(0, 0, canvas.width, canvas.height)

    type.fillStyle = 'white'
    type.font = '40px Arial'
    type.fillText(
      'Game over reload the page',
      canvas.width / 10,
      canvas.height / 2
    )
  }
}

// Запускаємо гру
let game = setInterval(drawGame, 200)
