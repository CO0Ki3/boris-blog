import { useEffect, useState, useCallback, lazy } from 'react';
import { useParams } from 'react-router-dom';
import Templates from '../common/Templates';
import { PostDto } from '../../dto/PostDto';
import styled from 'styled-components';
const ReactMarkdown = lazy(() => import('react-markdown'));

const Detail = () => {
  const { id } = useParams()
  const [post, setPost] = useState<PostDto | null>(null);

  const fetchPost = useCallback(async (id?: string) => {
    if(!id) return;
    const res = await fetch('http://localhost:3001/posts/' + id);
    const data = await res.json() as PostDto;
    setPost(data);
  }, [])

  useEffect(() => {
    fetchPost(id)
  }, [fetchPost, id])

  return (
    <Templates>
      <PostTitle>
        {post?.title}
      </PostTitle>

      {/* 
        * 과제 1.
        * [로딩 최적화 - 이미지 사이즈 최적화] 
        * 필요 이상의 큰 이미지 파일을 요청하여 로딩이 오래걸립니다.
        * 적절한 이미지의 사이즈는 영역 사이즈의 2배 정도 입니다.
        * 최적화된 이미지 포멧을 사용해 사이즈를 줄일 수 있습니다.
        */}

        {/* 
        * 과제 4.
        * [코어 웹 바이탈 개선 - CLS(Cumulative Layout Shift)]
        * 이미지 비율과 크기를 보정해 Layout Shift 현상을 개선해주세요.
        */}
      <PostImage src={post?.image} alt='thumnail'/>

      <PostContent>
        { post ? <ReactMarkdown children={post.content} /> : <>loading...</> }
      </PostContent>
    </Templates>
  )
}

const PostTitle = styled.h2`
  font-weight: 500;
  font-size: 2.5em;
  margin-top: 24px;
`

const PostImage = styled.img`
  width: 100%;
  margin-top: 12px;
`

const PostContent = styled.article`
  margin-top: 12px;
  line-height: 2;
`

export default Detail
