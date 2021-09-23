import { Button, Card } from "@material-ui/core";

interface Props {
    items: object;
    index: number;
}

export const Inventory: React.FC<Props> = ({items, index}) => {

    const InventoryElement = (items, index) => {
        return(
            <Card>
                {items.map((item, i) => (
                    <Button
                        variant={index === i ? 'contained' : 'text'}
                        key={item.component}
                    >
                        {item.component}
                    </Button>))
                }
            </Card>
            
        )
    }
    return(
        <div>
            {InventoryElement(items, index)}
        </div>
    )
}