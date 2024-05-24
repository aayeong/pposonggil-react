import React, { useEffect, useState } from 'react';

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=fa3cd41b575ec5e015970670e786ea86&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            const mapContainer = document.getElementById('map');
            const mapOptions = {
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                level: 3
            };
            const createdMap = new window.kakao.maps.Map(mapContainer, mapOptions);
            setMap(createdMap);
    
            const createdInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
            setInfowindow(createdInfowindow);
        };

        return () => {
            // Cleanup code
        };
    }, []);

    const searchPlaces = () => {
        const keyword = document.getElementById('keyword').value.trim();

        if (!keyword) {
            alert('키워드를 입력해주세요!');
            return;
        }

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    };

    const displayPlaces = (places) => {
        const bounds = new window.kakao.maps.LatLngBounds();
        removeAllChildNods('placesList');
        removeMarker();

        places.forEach((place, index) => {
            const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(placePosition, index);
            bounds.extend(placePosition);
            const itemEl = getListItem(index, place);
            document.getElementById('placesList')?.appendChild(itemEl);

            marker.addListener('mouseover', () => {
                displayInfowindow(marker, place.place_name);
            });

            marker.addListener('mouseout', () => {
                infowindow.close();
            });

            itemEl.addEventListener('mouseover', () => {
                displayInfowindow(marker, place.place_name);
            });

            itemEl.addEventListener('mouseout', () => {
                infowindow.close();
            });
        });

        map.setBounds(bounds);
    };

    // const getListItem = (index, place) => {
    //     const itemEl = document.createElement('li');
    //     const itemStr = `
    //         <span class="markerbg marker_${index + 1}"></span>
    //         <div class="info">
    //             <h5>${place.place_name}</h5>
    //             ${place.road_address_name ? `
    //                 <span>${place.road_address_name}</span>
    //                 <span class="jibun gray">${place.address_name}</span>
    //             ` : `
    //                 <span>${place.address_name}</span>
    //             `}
    //             <span class="tel">${place.phone}</span>
    //         </div>
    //     `;
    //     itemEl.innerHTML = itemStr;
    //     itemEl.className = 'item';
    //     return itemEl;
    // };

    const getListItem = (index, place) => {
      const itemEl = document.createElement('li');
      const itemStr = `
          <span class="markerbg marker_${index + 1}"></span>
          <div class="info">
              <h5>${place.place_name}</h5>
              ${place.road_address_name ? `
                  <span>${place.road_address_name}</span>
                  <span class="jibun gray">${place.address_name}</span>
              ` : `
                  <span>${place.address_name}</span>
              `}
              <span class="tel">${place.phone}</span>
              <span class="coordinates">위도: ${place.y}, 경도: ${place.x}</span>
          </div>
      `;
      itemEl.innerHTML = itemStr;
      itemEl.className = 'item';
      return itemEl;
  };
  

    const addMarker = (position, idx) => {
        const marker = new window.kakao.maps.Marker({
            position: position,
        });
        marker.setMap(map);
        setMarkers(prevMarkers => [...prevMarkers, marker]);
        return marker;
    };

    const removeMarker = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    };

    const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        removeAllChildNods(paginationEl);

        for (let i = 1; i <= pagination?.last; i++) {
            const el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;
            if (i === pagination?.current) {
                el.className = 'on';
            } else {
                el.addEventListener('click', () => {
                    pagination.gotoPage(i);
                });
            }
            paginationEl?.appendChild(el);
        }
    };

    const displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    const removeAllChildNods = (parentId) => {
        const parentEl = document.getElementById(parentId);
        if (parentEl) {
            while (parentEl.hasChildNodes()) {
                parentEl.removeChild(parentEl.lastChild);
            }
        }
    };

    return (
        <div className="map_wrap">
            <div id="map" style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}></div>

            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        <form onSubmit={(e) => { e.preventDefault(); searchPlaces(); }}>
                            키워드 : <input type="text" defaultValue="이태원 맛집" id="keyword" size="15" />
                            <button type="submit">검색하기</button>
                        </form>
                    </div>
                </div>
                <hr />
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        </div>
    );
};

export default MapComponent;
