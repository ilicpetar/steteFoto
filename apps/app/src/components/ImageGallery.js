import React from 'react';
import Gallery from 'react-grid-gallery';
import vozilo1 from '../../assets/images/vozila/skoda1.jpg';




// const src = ["https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
// ,"https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg"
// ,"https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"
// ,"https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg"
// ]

// const IMAGES =
// [{
//         src: "https://t-ws.generali.rs:20044/api/File/getFile?brstete=AO-4251/2021&filename=IMG_20200502_071828.jpg&maxWidth=1024&maxHeight=1024",
//         thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
//         isSelected: true,
//         caption: "After Rain (Jeshu John - designerspics.com)"
// },
// {
//         src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         // thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
//         caption: "Boats (Jeshu John - designerspics.com)"
// },
// {
//         src:  vozilo1,
//         thumbnail: vozilo1,
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
// },
// {
//         src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         // thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212
// }]


// const IMAGES =
// [{
//         src: "https://t-ws.generali.rs:20044/api/File/getFile?brstete=AO-4251/2021&filename=20200626_105508.jpg&maxWidth=1024&maxHeight=1024",
//         thumbnail: "https://t-ws.generali.rs:20044/api/File/getFile?brstete=AO-4251/2021&filename=20200626_105508.jpg&maxWidth=1024&maxHeight=1024",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
//         isSelected: true,
//         caption: "After Rain (Jeshu John - designerspics.com)"
// },
// {
//         src: "https://t-ws.generali.rs:20044/api/File/getFile?brstete=AO-4251/2021&filename=20200626_105508.jpg&maxWidth=1024&maxHeight=1024",
//         thumbnail: "https://t-ws.generali.rs:20044/api/File/getFile?brstete=AO-4251/2021&filename=20200626_105508.jpg&maxWidth=1024&maxHeight=1024",
//         // thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
//         caption: "Boats (Jeshu John - designerspics.com)"
// }]

function ImageGallery({photos}) {
      

    console.log(window.innerWidth,window.innerHeight)

    

    const IMAGES = photos && photos.map(photo=> (
           {
              src:photo,
              thumbnail:photo, 
        //       thumbnailWidth: 320, 
              thumbnailHeight: 320  
           } 
    ))
    console.log('IMAGES galery',IMAGES)
  return <Gallery images={IMAGES} backdropClosesModal={true}/>

}

export default ImageGallery;