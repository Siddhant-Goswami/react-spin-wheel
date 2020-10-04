import React from 'react';

import './wheel.css';

interface WheelProps {
  items: string[];
  onSelectItem?: (selectedItem: number) => void;
}

interface WheelState {
  selectedItem: any;
  isActive: boolean;
  angle: number;
  startAngle: number;
  currentAngle: number;
  boxCenterPoint: any;
}

function customStyle(index: number) {
  return { '--item-nb': index } as React.CSSProperties;
}
function isTouchScreendevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
export class Wheel extends React.Component<WheelProps, WheelState> {
  box: any;
  state: WheelState;
  constructor(props: WheelProps) {
    super(props);
    this.state = {
      selectedItem: null,
      isActive: false,
      angle: 0,
      startAngle: 0,
      currentAngle: 0,
      boxCenterPoint: {},
    };
    this.selectItem = this.selectItem.bind(this);
    this.getPositionFromCenter = this.getPositionFromCenter.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.deslectAll = this.deslectAll.bind(this);
  }

  // to avoid unwanted behaviour, deselect all text
  deslectAll() {
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
  }

  // method to get the position of the pointer event relative to the center of the box
  getPositionFromCenter(event) {
    const { boxCenterPoint } = this.state;
    let clientX, clientY;
    if (event.targetTouches && event.targetTouches[0]) {
      clientX = event.targetTouches[0].pageX;
      clientY = event.targetTouches[0].pageY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    const fromBoxCenter = {
      x: clientX - boxCenterPoint.x,
      y: -(clientY - boxCenterPoint.y),
    };
    return fromBoxCenter;
  }

  mouseDownHandler(e) {
    e.stopPropagation();
    const fromBoxCenter = this.getPositionFromCenter(e);
    const newStartAngle =
      90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
    this.setState({
      startAngle: newStartAngle,
      isActive: true,
    });
  }

  mouseUpHandler(e) {
    this.deslectAll();
    e.stopPropagation();
    const { isActive, angle, startAngle, currentAngle } = this.state;
    if (isActive) {
      const newCurrentAngle = currentAngle + (angle - startAngle);
      this.setState({
        isActive: false,
        currentAngle: newCurrentAngle,
      });
    }
  }

  mouseMoveHandler(e) {
    const { isActive, currentAngle, startAngle } = this.state;
    if (isActive) {
      const fromBoxCenter = this.getPositionFromCenter(e);
      const newAngle =
        90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);

      this.box.style.transform =
        'rotate(' +
        (currentAngle + (newAngle - (startAngle ? startAngle : 0))) +
        'deg)';
      this.setState({ angle: newAngle });
    }
  }

  componentDidMount() {
    const boxPosition = this.box.getBoundingClientRect();
    const boxCenterX = boxPosition.left + boxPosition.width / 2;
    const boxCenterY = boxPosition.top + boxPosition.height / 2;

    this.setState({
      boxCenterPoint: { x: boxCenterX, y: boxCenterY },
    });

    window.onmouseup = this.mouseUpHandler;
    window.onmousemove = this.mouseMoveHandler;

    if (isTouchScreendevice()) window.ontouchend = this.mouseUpHandler;
    window.ontouchmove = this.mouseMoveHandler;
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    } as React.CSSProperties;
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div
        className="wheel-container"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onTouchStart={this.mouseDownHandler}
        onTouchEnd={this.mouseUpHandler}
        ref={div => (this.box = div)}
      >
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
        >
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={customStyle(index)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
