import * as React from "react";
import SingleCard from "./SingleCard";
import Grid from "@mui/material/Grid";

export default function MultipleCard({meta_data}) {
  return (
      <Grid container spacing={5}>
        {meta_data.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
                <SingleCard item = {item}/>
            </Grid>
        ))}
    </Grid>
  );
}
