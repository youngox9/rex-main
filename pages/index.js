import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Tween, Timeline, ScrollTrigger } from "react-gsap";
import { v4 as uuidv4 } from "uuid";

import _ from "lodash";

const Div = styled.div`
  .container {
    .content {
      display: block;
      margin: 0 auto;
      max-width: 1200px;
      /* margin-bottom: 100vh; */
      min-height: 100vh;
      border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      position: relative;
    }
    #test1 {
      height: 600vh;
    }
    .kv {
      position: absolute;
      height: 100vh;
      width: 100%;
      top: 0;
    }
    .ball {
      position: absolute;
      width: 200px;
      height: 200px;
      top: 50%;
      background-color: red;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url("/test1.png") center/cover no-repeat;
    }
  }
`;

const ScrollItem = (props) => {
  const uid = `${uuidv4()}`;
  const { children } = props;
  const elementRef = useRef(null);
  const childrenDom = React.cloneElement(children, {
    ref: elementRef,
    "scroll-id": `${uid}`,
  });
  // if (!childrenDom?.current) return;

  useEffect(() => {
    console.log(elementRef.current);
  }, [elementRef?.current]);

  const scrollConfig = {
    // scrollTrigger: "",

    end: "bottom bottom",
    start: "top top",
    startTrigger: `[scroll-id="${uid}"]`,
    endTrigger: `[scroll-id="${uid}"]`,
    scrub: 1,
    pin: true,
    // markers: true,
  };

  // if (!elementRef?.current) return null;
  return <ScrollTrigger {...scrollConfig}>{childrenDom}</ScrollTrigger>;
};

export default function IndexPage() {
  return (
    <Div>
      <div className="container">
        <div className="content"></div>
        <ScrollItem>
          <div className="content" id="test1">
            <div className="kv" id="target">
              <Timeline target={<div className="ball" id="ball"></div>}>
                <Tween
                  from={{ scale: 0 }}
                  to={{
                    borderRadius: "100%",
                  }}
                />
                <Tween
                  to={{
                    borderRadius: "0%",
                    rotation: 360,
                    scale: 2,
                  }}
                />
                <Tween
                  to={{
                    borderRadius: "100%",
                    scale: 0,
                  }}
                />
              </Timeline>
            </div>
          </div>
        </ScrollItem>
        <div id="test2"></div>
        <div className="content">2</div>
        <div className="content">3</div>
      </div>
    </Div>
  );
}
