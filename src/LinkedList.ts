type INode<T> = {
  value: T
  next: INode<T> | null
} | null

class LinkedList<T extends string | number> {
  private first: INode<T> = null
  private last: INode<T> = null
  private size = 0

  private makeNode(value: T): INode<T> {
    return { value, next: null }
  }

  private getPrevious(node: INode<T>) {
    let current = this.first
    while (current) {
      if (current.next === node) return current
      current = current.next
    }
    return null
  }

  addFirst(value: T) {
    const node = this.makeNode(value)
    if (!this.first) {
      this.first = this.last = node
    } else {
      node!.next = this.first
      this.first = node
    }
    this.size++
  }

  addLast(value: T) {
    const node = this.makeNode(value)

    if (!this.first) this.first = this.last = node
    else {
      this.last!.next = node
      this.last = node
    }
    this.size++
  }

  removeFirst() {
    if (!this.first) throw Error("List is empty")
    if (!this.first.next) this.first = this.last = null
    else {
      const newFirst = this.first.next
      this.first.next = null
      this.first = newFirst
    }
    this.size--
  }

  removeLast() {
    if (!this.last) throw Error("List is empty")
    let previous = this.getPrevious(this.last)
    if (!previous) this.first = this.last = null
    else {
      previous.next = null
      this.last = previous
    }
    this.size--
  }

  getSize() {
    return this.size
  }

  indexOf(value: T) {
    let index = 0
    let current = this.first
    while (current) {
      if (current.value === value) return index
      current = current.next
      index++
    }
    return -1
  }

  contains(value: T) {
    const result = this.indexOf(value)
    return result >= 0
  }

  toArray() {
    let current = this.first
    let index = 0
    const array = []
    while (current !== null) {
      array[index++] = current.value
      current = current.next
    }
    return array
  }

  reverse() {
    if (!this.first) return
    let current = this.first.next
    let previous = this.first
    while (current) {
      const next = current.next
      current.next = previous
      previous = current
      current = next
    }

    this.last = this.first
    this.last.next = null
    this.first = previous
  }

  getKthFromTheEnd(k: number) {
    if (!this.last) throw Error("List is empty")
    if (k < 1) throw Error("k should be larger then 1")
    if (k > this.size) throw Error("k is larger then size of list")

    let count = 0
    let current = this.first
    let target: INode<T> = this.first
    while (current) {
      if (count < k) {
        current = current.next
        count++
      } else {
        target = target!.next
        current = current.next
      }
    }

    return target!.value
  }

  printMiddle() {
    let size = 0
    let count = 0
    let current = this.first
    let middle = this.first
    while (current) {
      current = current.next
      if (count == 2) {
        middle = middle!.next
        count = 0
      }
      size++
      count++
    }

    return size % 2 === 0
      ? { a: middle!.value, b: middle!.next!.value }
      : middle!.value
  }

  makeCircular() {
    if (!this.last) throw new Error("List is empty")
    this.last.next = this.first
  }

  hasLoop() {
    let count = 0
    let current = this.first
    let behind = this.first
    while (current) {
      current = current.next
      if (count == 2) {
        behind = behind!.next
        count = 0
      }
      if (current === behind) return true
      count++
    }
    return false
  }
}

const numberList = new LinkedList<number>()

numberList.addLast(1)
numberList.addLast(2)
numberList.addLast(3)
numberList.addLast(4)

console.log(numberList.hasLoop())
