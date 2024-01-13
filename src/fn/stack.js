class Move {
  constructor(data, prev = null) {
    this.data = data
    this.prev = prev
  }

  setPrev(move) {
    this.prev = move
  }
}


class Turn {
  constructor(head = null, tail = null) {
    this.head = head
    this.tail = tail
  }

  add(move) {
    if(move) {
      if(!this.head) {
        console.log('Stuff')
        this.head = move
      }

      move.setPrev(this.tail)
      this.tail = move

      return true
    } else {
      alert('No turn available')
      return false
    }
  }

  undo() {
    if(this.tail !== null) {
      let lastTurn = this.tail

      this.tail = lastTurn.prev

      return lastTurn
    } else {
      return false
    }
  }

  print() {
    let current = this.tail

    console.log('Turns:')
    while(current) {
      console.log(current.data)
      current = current.prev
    }
  }
}

export {Turn, Move}