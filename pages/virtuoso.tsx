import { useEffect, useState } from 'react';
import Image from "next/image";
import AutoSizer from 'react-virtualized-auto-sizer';
import { Virtuoso } from 'react-virtuoso';
import styles from '../styles/Virtuoso.module.css';

// 80文字、200文字、500文字
const texts = {
  '80': 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れていま',
  '200': 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ',
  '500': 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミー'
}

// リストの高さをテキスト以外でも可変にするためにimageがundefinedのパターンを作りたいので要素を2つに
const images = {
  image1: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/145a7eb7-9c43-4d8e-bd11-a303162ed7ba-beautiful_cities_bruges.jpg',
  image2: 'https://www.easemytrip.com/travel/img/world-beautiful-cities.jpg',
}

const random = (from, to) => {
  const min = Math.ceil(from);
  const max = Math.floor(to + 1);
  return Math.floor(Math.random() * (max - min) + min);
}

const factory = (limit) => {
  return [...Array(limit)].map(() => {
    return{
      text: Object.values(texts)[random(0, 2)],
      image: Object.values(images)[random(0, 2)]
    }
  })
}

const PER_PAGE = 100;

const Container = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMore = (limit) => {
    setLoading(true);
    setTimeout(() => {
      setItems([...items, ...factory(limit)]);
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setItems(factory(PER_PAGE));
  }, []);

  const ItemContent = (index) => {
    const item = items[index];
    return (
      <div className={styles.list}>
        <p>{index + 1}.{item.text}</p>
        {item.image && (
          <Image src={item.image} alt={`image${index}`} width='100%' height='100%' layout='responsive' objectFit='contain' />
        )}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Virtuoso Sample | Items: {items.length}</div>
          <AutoSizer className={styles.autoSizer}>
            {(style) => (
              <Virtuoso
                style={style}
                className={styles.virtuoso}
                data={items}
                itemContent={ItemContent}
                initialTopMostItemIndex={PER_PAGE - 1}
                alignToBottom
                startReached={() => loadMore(PER_PAGE)}
                components={{
                  Header: () => loading ? <>Loading...</> : null
                }}
              />
            )}
          </AutoSizer>
      </div>
    </div>
  )
}

export default Container;
