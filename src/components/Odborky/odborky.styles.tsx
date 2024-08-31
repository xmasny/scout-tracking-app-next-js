import styled from '@emotion/styled';
import { Search } from '@mui/icons-material';
import { Box, Container, Paper } from '@mui/material';

export const OdborkyContainer = styled(Container)`
  justify-items: center;
  align-items: center;
`

export const BoxSpinner = styled(Box)`
  display: grid;
  justify-content: center;
  margin-top: 7rem;
`

export const OdporkyPaper = styled(Paper)` 
  display: flex;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 5rem;
  z-index: 10;
  margin: 6rem 1rem 0 1rem;
  padding: 5px 5px 5px;
  width: 90%;
`

export const OdporkySearch = styled(Search)` 
  padding: 10px;
`

export const OdporkyFab = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
`

export  const FloatingButton = styled(Box)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const FloatingButtonLast = styled(Box)`
  margin-top: 1rem;
`
export const OdborkyBox = styled(Box)`
  width: 100%;
`