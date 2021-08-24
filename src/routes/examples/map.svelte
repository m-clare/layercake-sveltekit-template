<script>
    import { LayerCake, ScaledSvg, Html } from 'layercake';
    import { feature } from 'topojson-client';
    // import { geoAlbersUsa } from 'd3-geo';
    import { scaleQuantize } from 'd3-scale';
    import { onMount } from 'svelte';

    import MapSvg from '$lib/layercake-components/Map.svg.svelte';

    import usStates from '$lib/data/us-states.topojson.json';
    import stateData from '$lib/data/us-states-data.json';

    async function getProjection() {
      const { geoAlbersUsa } = await import('d3-geo');
      const projection = geoAlbersUsa();


      return projection;
    };

    let promise = getProjection();

    const colorKey = 'myValue';
    const joinKey = 'name';
    const dataLookup = new Map();
    const geojson = feature(usStates, usStates.objects.collection);
    const aspectRatio = 2.63;
    

    stateData.forEach(d => {
        dataLookup.set(d[joinKey], d);
    });

    geojson.features.forEach(d => {
        Object.assign(d.properties, dataLookup.get(d.properties[joinKey]));
    });

    const flatData = geojson.features.map(d => d.properties);
    const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
 </script>

<style>
    .chart-container {
        position: relative;
        width: 100%;
    }
</style>



<main>
  <div class="chart-container" style="padding-bottom:{100 / aspectRatio}%">
    <LayerCake
      ssr={false}
      position='absolute'
      data={geojson}
      z={colorKey}
      zScale={scaleQuantize()}
      zRange={colors}
      {flatData}
      >
      <ScaledSvg
        fixedAspectRatio={aspectRatio}
      >
      {#await promise then projection}
        <MapSvg
          fixedAspectRatio={aspectRatio}
          {projection}
        />
        {/await}
      </ScaledSvg>
    </LayerCake>
  </div>
</main>