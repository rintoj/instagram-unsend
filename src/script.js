// wait
let wait = async (time = 1000) => await new Promise(resolve => setTimeout(resolve, time))

let selectMessageItem = async item => {
  item.click()
  await wait()
}

let scrollYBy = async (selector, backward = false) => {
  let box = document.querySelector(selector)
  box.scrollBy(0, (backward ? -1 : 1) * 100)
  await wait()
  if (backward) return box.scrollTop !== 0
  let scrollableHeight = box.scrollHeight - box.clientHeight
  return box.scrollTop < scrollableHeight
}

let hover = async element => {
  element.dispatchEvent(
    new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  )
}

let selectMessages = () => {
  let messages = []
  document
    .querySelectorAll('[role=row]')
    .forEach(n => (n.style[0] === '--card-background' ? messages.push(n) : undefined))
  return messages
}

let scrollMessages = async () =>
  scrollYBy('[data-pagelet=IGDOpenMessageList]>div>div>div>div>div', true)

let scrollChats = async () =>
  scrollYBy("[aria-label=Chats]>div>div>div")

async function run() {
  var items = document.querySelectorAll('[role=listitem]')
  // for (const item of items) {
  //   item.click()
  //   await wait()
  // }
  selectMessageItem(items[0])
}

void run()
