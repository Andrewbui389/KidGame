export function drawRect(detections, ctx) {
    detections.forEach(prediction => {
        const[x,y,width,height] = prediction['bbox']
        const text = prediction['class']
        let color
        if(prediction['class'] === 'person'){
            color = 'white'
        } else {
            color = 'green'
        }
        ctx.strokeStyle = color 
        ctx.font= '20px aria'
        ctx.fillStyle = color

        ctx.beginPath()
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()
    });
}