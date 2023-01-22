import React from 'react';
import Card from 'react-bootstrap/Card';

import { ListingInfo } from '../../../Types/ListingTypes';

function ListingCard(props: ListingInfo) {
    return (
        <Card>
            <Card.Img src=''/>
            <Card.Body>
                <>
                    <Card.Title>
                        {props.listingBody.title}
                    </Card.Title>
                    <Card.Text>
                        {props.listingBody.description}
                    </Card.Text>
                    {props.listingBody.tags.map(tag => {
                        <Card body>
                            {tag}
                        </Card>
                    })}
                </>
            </Card.Body>
        </Card>
    )
}

export { ListingCard };