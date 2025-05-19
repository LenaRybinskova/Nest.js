import { Injectable } from '@nestjs/common'

type Item = {
  id: string
  date: string
}

type Items = {
  [key: string]: Item
}

@Injectable()
export class ItemsService {
  private items: Items = plants

  getAllItems(): Item[] {
    return Object.values(this.items)
  }

  addItem(item: Item): void {
    this.items[item.id] = item
  }
}

const plants: Items = {
  '111': {
    id: '111',
    date: '21.04.2025',
  },
}
