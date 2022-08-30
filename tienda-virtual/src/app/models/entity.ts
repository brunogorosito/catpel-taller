export default abstract class Entity {
    id: number;
  
    protected constructor(id: number | { value: number }) {
      if (id && typeof id !== "number")
        this.id = (id as { value: number }).value;
      else
        this.id = id as number;
    }
  
    equals(entity: Entity): boolean {
      return entity != null && this.id != null && entity.id === this.id;
    }
  
  }
  