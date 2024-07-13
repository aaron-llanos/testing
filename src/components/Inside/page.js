/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import './page.scss'
import 'animate.css';

import Image from "next/image";

import Link from 'next/link'

import { useInView } from "react-intersection-observer";

import Menu from '@/components/Menu/Menu';
import Footer from '@/components/Footer/Footer';
import Button from '@/components/Button/Button';
import Underline from '@/components/Underline/Underline';
import InsideSlider from '../InsideSlider/InsideSlider';

import { properties as propertiesUS, propertiesMX } from '@/helpers/properties';
import { dynamicClass } from '@/helpers/dynamic-class';
import useWidth from '@/hooks/useWidth';

export default function Inside({ params, isMX }) {
  const { isMobile } = useWidth()

  const properties = isMX ? propertiesMX : propertiesUS;

  const filterProperty = properties.find(({ slug }) => slug === params.slug);
  const {
    id,
    name,
    size,
    type,
    unit,
    slug,
    image,
    details,
    gallery,
    location,
    progress,
    description,
  } = filterProperty;

  const galleryProps = {
    id: id,
    slug: slug,
    gallery: gallery
  }

  // Texts animations
  const { ref: ref01, inView: inView01 } = useInView();
  const { ref: ref03, inView: inView03 } = useInView();

  return (
    <Menu css="inside">
      <section className="inside" style={{ backgroundImage: `url('/inside/${id}-${slug}/${image}')` }}>
        <div className="inside-slider__info">
          <div
            className={`line ${dynamicClass(inView01, 'animate__animated animate__fadeInLeft')}`}
            style={{ opacity: `${inView01 ? '1' : '0'}` }}
            ref={ref01}
          >
            <div></div>
            <h3>OVERVIEW</h3>
          </div>
          <h2>{name}</h2>
        </div>
      </section>

      <section className="topics">
        <h4>PROJECT CHARACTERISTICS</h4>
        <div className="buttons">
          <p className="black">{progress}</p>
          <p className="btn-red">{type}</p>
        </div>

        <div className="character-container">
          <div className="character">
            <h5>LOCATION</h5>
            <p><strong>{location}</strong></p>
          </div>
          <div className="character">
            <h5>PROJECT SIZE</h5>
            <p><strong>{`${size} ${unit}`}</strong></p>
          </div>
          {/* <div className="character">
            <h5>DATE</h5>
            <p><strong>March 2024</strong></p>
          </div> */}
        </div>
      </section>
      <section className="about">
        <h4
          className={dynamicClass(inView03, 'animate__animated animate__fadeInLeft')}
          style={{ opacity: `${inView03 ? '1' : '0'}` }}
          ref={ref03}
        ><strong>About</strong> Project</h4>
        <p>{description}</p>

        {details.length > 0 && (
          <p style={{ marginTop: '1rem' }}>Amenities include:</p>
        )}
        <ul>
          {details.map((detail, key) => (
            <li key={key}>{detail}</li>
          ))}
        </ul>
      </section>

      {isMobile ? (
        <InsideSlider {...galleryProps} />
      ): (
        <section className="gallery">
          <h4><strong>Project</strong> Gallery</h4>
          <div className="gallery-grid">
            {gallery.map((img, key) => (
              <Image
                key={key}
                width={550}
                height={300}
                alt="property"
                src={`/inside/${id}-${slug}/${img}`}
              />
            ))}
          </div>
        </section>
      )}


      <Link href={isMX ? '/portfolio/mx' : '/portfolio/us'}>
        <Underline text="RETURN TO PROJECTS" />
      </Link>

      <Link href="/contact">
        <Button text="Request more information" />
      </Link>

      <Footer />
    </Menu>
  );
}
