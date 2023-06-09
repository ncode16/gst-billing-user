import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary className="faq-section"
    expandIcon={<KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, .125)',
}));
export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const accordion = {
    position: "relative",
    left: "15%",
    width: "70%"
  }
  const typographyParent = {
    fontWeight: "500",
    padding: "10px 0"
  }
  const typography = {
    fontSize: "15px",
    color: "grey"
  }
  const [faq, setFaq] = useState([])
  const url = 'http://10.16.16.11:8000/api/list/faq';
  useEffect(() => {
    axios.get(`${url}`)
      .then((res) => {
        setFaq(res?.data?.data)
      })
      .catch((e) => console.log("Faq", e));
  }, [])


  return (
    <div className='faq-section'>
      {faq && faq.length > 0 && faq.map((d, i) => {
        return (
          <Accordion key={`${d.faq_id}`} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography style={typographyParent}>{d.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={typography}>
                {d.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })
      }
    </div>
  );
}
