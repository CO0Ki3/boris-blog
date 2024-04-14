import { useCallback, useEffect, useState, useRef } from "react";
import Templates from "../common/Templates";
import styled from "styled-components";
import Post from "./Post";
import { PostDto } from "../../dto/PostDto";

const List = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3001/posts");
    const data = (await res.json()) as PostDto[];
    setPosts((prevPosts) => [...prevPosts, ...data]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (!loading) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchPosts();
          }
        });
      }, options);

      if (observer.current) {
        observer.current.observe(document.querySelector(".observerTarget")!);
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [fetchPosts, loading]);

  const postEls = posts.map((post) => <Post key={post.id} post={post} />);

  return (
    <Templates>
      <PostList>
        {postEls}
        <ObserverTarget className="observerTarget" />
      </PostList>
    </Templates>
  );
};

const PostList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 1px;
`;

export default List;
