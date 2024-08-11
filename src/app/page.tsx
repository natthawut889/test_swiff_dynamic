'use client'
import React, { useState } from "react";
import GradientBackground from "@/component/GradientBackground";
// import { serverSideTranslations } from 'i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Card, Divider, Typography } from "antd";
import BoxWrapper from "@/component/BoxWrapper";
import { CaretDownFilled, CaretLeftOutlined, CaretRightFilled, CaretUpFilled, XFilled } from "@ant-design/icons";
import AppBar from "@/component/AppBar";
import './i18n';

type Shape = {
  id: number;
  type: 'square' | 'circle' | 'ellipse' | 'trapezoid' | 'rectangle' | 'parallelogram';
  position: number;
};

export default function Home()
{
  const { t } = useTranslation('common');

  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleCardClick = () =>
  {
    setIsCardVisible(false);
  };

  const [shapes, setShapes] = useState<Shape[]>([
    { id: 1, type: 'square', position: 1 },  //สี่เหลี่ยม
    { id: 2, type: 'circle', position: 2 },  //วงกลม
    { id: 3, type: 'ellipse', position: 3 },  //สี่เหลี่ยม
    { id: 4, type: 'trapezoid', position: 4 },  //สี่เหลี่ยมคางหมู
    { id: 5, type: 'rectangle', position: 5 },  //สี่เหลี่ยมผืนผ้า
    { id: 6, type: 'parallelogram', position: 6 }  //สี่เหลี่ยมด้านขนาน
  ]);

  const positionMapLeft: { [key: number]: number } = {
    1: 6, // สี่เหลี่ยม ไป สี่เหลี่ยมด้านขนาน
    2: 1, // วงกลม ไป สี่เหลี่ยม
    3: 2, // สี่เหลี่ยม ไป วงกลม
    4: 3, // สี่เหลี่ยมคางหมู ไป สี่เหลี่ยม
    5: 4, // สี่เหลี่ยมผืนผ้า ไป สี่เหลี่ยมคางหมู
    6: 5  // สี่เหลี่ยมด้านขนาน ไป สี่เหลี่ยมผืนผ้า
  };

  // Left
  const swapPositionsLeft = () =>
  {
    setShapes((prevShapes) =>
    {
      return prevShapes.map(shape => ({
        ...shape,
        position: positionMapLeft[shape.position]
      }));
    });
  };

  const swapPositionsRandom = () => {
    setShapes(prevShapes => {
      const newPositions = [...prevShapes.map(shape => shape.position)].sort(() => Math.random() - 0.5);
      return prevShapes.map((shape, index) => ({
        ...shape,
        position: newPositions[index]
      }));
    });
  };

  const positionMapRight: { [key: number]: number } = {
    1: 2, // สี่เหลี่ยม ไป สี่เหลี่ยมด้านขนาน
    2: 3, // วงกลม ไป สี่เหลี่ยม
    3: 4, // สี่เหลี่ยม ไป วงกลม
    4: 5, // สี่เหลี่ยมคางหมู ไป สี่เหลี่ยม
    5: 6, // สี่เหลี่ยมผืนผ้า ไป สี่เหลี่ยมคางหมู
    6: 1  // สี่เหลี่ยมด้านขนาน ไป สี่เหลี่ยมผืนผ้า
  };

  // Right
  const swapPositionsRight = () =>
  {
    setShapes((prevShapes) =>
    {
      return prevShapes.map(shape => ({
        ...shape,
        position: positionMapRight[shape.position]
      }));
    });
  };


  const [isUpDown, setIsUpDown] = useState(false);

  const handleClickUpDown = () =>
  {
    setIsUpDown(prevState => !prevState);
  };


  return (
    <>
      <GradientBackground>
        <AppBar titleName={t('common:layout')} />
        {/* <BoxWrapper> */}

        {isCardVisible ? (
          <>
            <BoxWrapper>
              <Card
                className="box"
                style={{ marginRight: '10px' }}
                hoverable
                onClick={handleCardClick}
              >
                <Typography style={{ marginBottom: '40px', fontSize: '18px' }}>แบบทดสอบที่ 1</Typography>
                <Typography>การจัดการหน้าเว็บ</Typography>
              </Card>
              <Card
                className="box"
                style={{ marginRight: '10px' }}
                hoverable
                onClick={handleCardClick}
              >
                <Typography style={{ marginBottom: '40px', fontSize: '18px' }}>แบบทดสอบที่ 2</Typography>
                <Typography>การเชื่อม API</Typography>
              </Card>
              <Card
                className="box"
                style={{ marginRight: '10px' }}
                hoverable
                onClick={handleCardClick}
              >
                <Typography style={{ marginBottom: '40px', fontSize: '18px' }}>แบบทดสอบที่ 3</Typography>
                <Typography>การจัดการหน้าฟอร์ม</Typography>
              </Card>
            </BoxWrapper>
          </>
        ) : <>
          <div className="shape-container">
            <div className="shape-row2">
              <Card
                className="box1"
                hoverable
                onClick={swapPositionsLeft}
              >
                <CaretLeftOutlined style={{ color: '#808080' }} />
                <div className="center-box">Move shape</div>
              </Card>
              <Card
                className="boxUpDown"
                hoverable
                onClick={handleClickUpDown}
              >
                <CaretUpFilled style={{ color: '#808080', marginRight: '30px' }} />
                <CaretDownFilled style={{ color: '#808080' }} />
                <div className="center-box">Move position</div>
              </Card>
              <Card
                className="box1"
                hoverable
                onClick={swapPositionsRight}
              >
                <CaretRightFilled style={{ color: '#808080' }} />
                <div className="center-box">Move shape</div>
              </Card>
            </div>
          </div>

          <Divider />

          <div>
            <div className="shape-container">
              <div className="shape-row2">
                {!isUpDown ? (
                  <>
                    <div style={{ marginLeft: '310px' }} />
                  </>
                ) : null}
                {shapes
                  .filter(shape => shape.position <= 3)
                  .sort((a, b) => a.position - b.position)
                  .map((shape) => (
                    <Card key={shape.id} className="box3" hoverable
                      onClick={swapPositionsRandom}>
                      <div className={shape.type} />
                    </Card>
                  ))}
              </div>
            </div>

            <div className="shape-container">
              <div className="shape-row2">
                {isUpDown ? (
                  <>
                    <div style={{ marginLeft: '310px' }} />
                  </>
                ) : null}
                {shapes
                  .filter(shape => shape.position > 3)
                  .sort((a, b) => a.position - b.position)
                  .map((shape) => (
                    <Card key={shape.id} className="box3" hoverable
                      onClick={swapPositionsRandom}>
                      <div className={shape.type} />
                    </Card>
                  ))}
              </div>
            </div>

          </div>
        </>
        }

        {/* </BoxWrapper> */}

      </GradientBackground>
    </>
  );
}

// export async function getStaticProps({ locale }: any)
// {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale,
//         'common'))
//     }
//   };
// }
